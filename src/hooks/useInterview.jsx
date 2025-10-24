import { useState, useRef, useEffect, useCallback } from "react";

// const THINKING_TIMEOUT_DURATION = 15000;
const SPEAKING_TIMEOUT_DURATION = 5000;
const AUDIO_THRESHOLD = 15;
const AI_SPEAKING_END_TIMEOUT = 1500;
const NUDGE_TIMINGS = [15000, 20000, 30000];
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const useInterview = (interviewId) => {
  const [status, setStatus] = useState("Ready to start");
  const [transcripts, setTranscripts] = useState([]);
  const [provisionalTranscript, setProvisionalTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const ws = useRef(null);
  const mediaRecorder = useRef(null);
  const activeTimer = useRef(null);
  const analyser = useRef(null);
  const listeningActive = useRef(false);
  const streamRef = useRef(null);
  const audioBufferQueue = useRef([]);
  const isSchedulerRunning = useRef(false);
  const nextChunkTime = useRef(0);
  const aiSpeakingTimer = useRef(null);
  const monitoringAnimationFrame = useRef(null);
  const pendingRecordingStart = useRef(null);
  const nudgeLevel = useRef(0);

  const schedulePlayback = useCallback(() => {
    if (audioBufferQueue.current.length === 0) {
      isSchedulerRunning.current = false;
      return;
    }
    isSchedulerRunning.current = true;
    while (audioBufferQueue.current.length > 0) {
      const audioBuffer = audioBufferQueue.current.shift();
      if (!audioBuffer) continue;
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      const startTime = Math.max(
        audioContext.currentTime,
        nextChunkTime.current
      );
      source.start(startTime);
      // Schedule the next chunk to play right after the current one ends
      nextChunkTime.current = startTime + audioBuffer.duration;
    }
    isSchedulerRunning.current = false;
  }, []);

  const startPlayback = useCallback(async () => {
    if (isSchedulerRunning.current || audioBufferQueue.current.length === 0)
      return;
    // Ensure the context is running before scheduling
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
    // Set the initial start time for the first chunk in a new playback sequence
    if (
      audioContext.currentTime === 0 ||
      nextChunkTime.current < audioContext.currentTime
    ) {
      nextChunkTime.current = audioContext.currentTime + 0.01;
    }
    schedulePlayback();
  }, [schedulePlayback]);

  const clearActiveTimer = () => {
    if (activeTimer.current) {
      clearTimeout(activeTimer.current);
      activeTimer.current = null;
    }
  };

  const stopMonitoring = () => {
    if (monitoringAnimationFrame.current) {
      cancelAnimationFrame(monitoringAnimationFrame.current);
      monitoringAnimationFrame.current = null;
    }
  };

  const clearPendingRecording = () => {
    if (pendingRecordingStart.current) {
      clearTimeout(pendingRecordingStart.current);
      pendingRecordingStart.current = null;
    }
  };

  const stopRecording = useCallback(() => {
    console.log("stopRecording called");

    listeningActive.current = false;
    stopMonitoring();
    clearActiveTimer();

    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    analyser.current = null;
    setIsRecording(false);
  }, []);

  const startRecording = useCallback(async () => {
    console.log(
      `Attempting to start recording. isRecording: ${isRecording}, isAiSpeaking: ${isAiSpeaking}`
    );

    if (isRecording || isAiSpeaking || audioContext.state !== "running") {
      console.log("Recording blocked - conditions not met");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      analyser.current = audioContext.createAnalyser();
      analyser.current.fftSize = 256;
      const micSource = audioContext.createMediaStreamSource(stream);
      micSource.connect(analyser.current);

      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      mediaRecorder.current.stopReason = "ended";

      mediaRecorder.current.onstart = () => {
        console.log("MediaRecorder started");
        setIsRecording(true);
        setStatus("Listening... (thinking time)");
        listeningActive.current = true;

        let inThinkingPhase = true;
        let wasSpeaking = false;

        clearActiveTimer();
        if (nudgeLevel.current < NUDGE_TIMINGS.length) {
          const timeout = NUDGE_TIMINGS[nudgeLevel.current];
          activeTimer.current = setTimeout(() => {
            console.log(`Nudge ${nudgeLevel.current + 1} timeout reached`);
            if (mediaRecorder.current?.state === "recording" && !isAiSpeaking) {
              mediaRecorder.current.stopReason = "not_responding";
              nudgeLevel.current += 1;
              stopRecording();
            }
          }, timeout);
        }

        const monitor = () => {
          if (
            !listeningActive.current ||
            isAiSpeaking ||
            !mediaRecorder.current ||
            mediaRecorder.current.state !== "recording"
          ) {
            stopMonitoring();
            return;
          }

          if (!analyser.current) {
            stopMonitoring();
            return;
          }

          const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
          analyser.current.getByteTimeDomainData(dataArray);
          const avgVolume =
            dataArray.reduce((sum, value) => sum + Math.abs(value - 128), 0) /
            dataArray.length;
          const isCurrentlySpeaking = avgVolume > AUDIO_THRESHOLD;

          if (isCurrentlySpeaking) nudgeLevel.current = 0;
          if (inThinkingPhase && isCurrentlySpeaking) {
            console.log("Switching from thinking to speaking phase");
            clearActiveTimer();
            inThinkingPhase = false;
            setStatus("Listening... (speaking)");
            wasSpeaking = true;
          }

          if (!inThinkingPhase) {
            if (isCurrentlySpeaking) {
              if (!wasSpeaking) {
                // --- TRANSITION: SILENCE -> SPEAKING ---
                console.log("User resumed speaking, clearing pause timer.");
                clearActiveTimer();
              }
            } else {
              if (wasSpeaking) {
                // --- TRANSITION: SPEAKING -> SILENCE ---
                console.log(
                  `User paused, starting ${SPEAKING_TIMEOUT_DURATION}ms timer.`
                );
                clearActiveTimer();
                activeTimer.current = setTimeout(() => {
                  console.log("Speaking timeout reached (user paused).");
                  if (
                    mediaRecorder.current?.state === "recording" &&
                    !isAiSpeaking
                  ) {
                    mediaRecorder.current.stopReason = "ended";
                    stopRecording();
                  }
                }, SPEAKING_TIMEOUT_DURATION);
              }
            }
          }

          wasSpeaking = isCurrentlySpeaking; // update for next frame
          monitoringAnimationFrame.current = requestAnimationFrame(monitor);
        };
        monitoringAnimationFrame.current = requestAnimationFrame(monitor);
      };

      mediaRecorder.current.ondataavailable = async (event) => {
        if (
          event.data.size > 0 &&
          !isAiSpeaking &&
          ws.current?.readyState === WebSocket.OPEN
        ) {
          try {
            const arrayBuffer = await event.data.arrayBuffer();
            console.log("ARRAY BUFFER :: ", arrayBuffer);
            ws.current.send(arrayBuffer);
          } catch (err) {
            console.error("Error sending audio chunk:", err);
          }
        }
      };

      mediaRecorder.current.onstop = () => {
        console.log("MediaRecorder stopped");
        const stopReason = mediaRecorder.current?.stopReason || "ended";

        if (!isAiSpeaking && ws.current?.readyState === WebSocket.OPEN) {
          if (stopReason === "not_responding") {
            setStatus("User not responding, processing...");
            ws.current.send(
              JSON.stringify({
                type: "user_not_responding",
                nudgeLevel: nudgeLevel.current - 1,
              })
            );
          } else if (stopReason === "ended") {
            setStatus("Processing...");
            ws.current.send(JSON.stringify({ type: "end_user_speech" }));
          }
        }
      };

      mediaRecorder.current.onerror = (event) => {
        console.error("MediaRecorder error:", event.error);
        stopRecording();
      };

      mediaRecorder.current.start(1000); // Send audio chunks every 1000ms
    } catch (err) {
      console.error("Error starting recorder:", err);
      setStatus("Microphone/Recorder failed.");
      stopRecording();
    }
  }, [isRecording, isAiSpeaking, stopRecording]);

  const initialize = useCallback(async () => {
    if (isInitialized) return;
    setStatus("Initializing...");
    try {
      if (audioContext.state === "suspended") await audioContext.resume();
      setIsInitialized(true);
      setStatus("Ready to start");
    } catch (error) {
      setStatus("Error: Could not start audio. Please check permissions.");
    }
  }, [isInitialized]);

  const endInterview = async (time) => {
    if (ws.current) {
      try {
        ws.current.send(JSON.stringify({ type: "end_interview", time }));
        stopRecording();
        clearActiveTimer();
        clearPendingRecording();
        stopMonitoring();

        setTimeout(() => {
          if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.close(1000, "Interview ended by user");
          }
        }, 500);
      } catch (err) {
        console.error("Error during endInterview:", err);
      }
    }
  };

  useEffect(() => {
    if (!isInitialized) return;
    ws.current = new WebSocket(
      `wss://${import.meta.env.VITE_BACKEND_HOST}?interviewId=${interviewId}`
    );
    ws.current.binaryType = "arraybuffer";

    ws.current.onopen = () => {
      setStatus("Connected. Waiting for question...");
      ws.current.send(JSON.stringify({ type: "start_interview" }));
    };

    ws.current.onclose = () => {
      setStatus("Disconnected. Please restart.");
      setIsInitialized(false);
      stopRecording();
    };

    ws.current.onerror = () => {
      setStatus("Connection Error");
      stopRecording();
    };

    ws.current.onmessage = async (event) => {
      try {
        let message = JSON.parse(event.data);

        if (typeof message === "string") {
          message = JSON.parse(message);
        }
        switch (message.type) {
          case "audio":
            if (isRecording) {
              stopRecording();
            }
            clearPendingRecording();

            if (!isAiSpeaking) {
              setIsAiSpeaking(true);
            }

            if (aiSpeakingTimer.current) {
              clearTimeout(aiSpeakingTimer.current);
            }

            try {
              const audioData = Uint8Array.from(atob(message.data), (c) =>
                c.charCodeAt(0)
              ).buffer;
              const audioBuffer = await audioContext.decodeAudioData(audioData);
              audioBufferQueue.current.push(audioBuffer);
              await startPlayback();
            } catch (error) {
              console.error("Error decoding audio data:", error);
            }

            // --- FIX: Wait until playback truly ends ---
            aiSpeakingTimer.current = setTimeout(function checkPlayback() {
              const now = audioContext.currentTime;
              const playbackEndTime = nextChunkTime.current;

              if (
                audioBufferQueue.current.length === 0 &&
                now >= playbackEndTime
              ) {
                console.log("AI playback has truly finished.");
                setIsAiSpeaking(false);
              } else {
                // Keep checking every 200ms until finished
                aiSpeakingTimer.current = setTimeout(checkPlayback, 200);
              }
            }, AI_SPEAKING_END_TIMEOUT);
            break;

          case "status":
            setStatus(message.message);
            break;

          case "provisional_transcript":
            setProvisionalTranscript(message.transcript);
            break;

          case "user_transcript":
            setProvisionalTranscript("");
            setTranscripts((prev) => [
              ...prev,
              { source: "user", text: message.transcript },
            ]);
            break;

          case "ai_transcript_fragment":
            setTranscripts((prev) => {
              const newTranscripts = [...prev];
              const last = newTranscripts[newTranscripts.length - 1];
              if (last?.source === "ai") {
                last.text += message.fragment;
              } else {
                newTranscripts.push({ source: "ai", text: message.fragment });
              }
              return newTranscripts;
            });
            break;

          default:
            break;
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      stopRecording();
      clearPendingRecording();
    };
  }, [isInitialized, startPlayback]);

  useEffect(() => {
    if (isAiSpeaking) {
      clearPendingRecording();
      if (isRecording) {
        console.log("Stopping recording because AI started speaking");
        stopRecording();
      }
    } else {
      if (isInitialized && !isRecording) {
        console.log("AI finished speaking, scheduling recording start");
        clearPendingRecording();
        pendingRecordingStart.current = setTimeout(() => {
          if (!isAiSpeaking && !isRecording && isInitialized) {
            console.log("Starting recording after AI finished");
            startRecording();
          }
        }, 300); // Small delay for state stability
      }
    }
  }, [isAiSpeaking, isInitialized]);

  useEffect(() => {
    return () => {
      console.log("Component unmounting, cleaning up");
      if (aiSpeakingTimer.current) clearTimeout(aiSpeakingTimer.current);
      clearActiveTimer();
      stopMonitoring();
      clearPendingRecording();
      stopRecording();
    };
  }, [stopRecording]);

  return {
    status,
    transcripts,
    provisionalTranscript,
    isRecording,
    isInitialized,
    isAiSpeaking,
    initialize,
    endInterview,
  };
};
