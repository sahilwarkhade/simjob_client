import { useContext } from "react";
import CTAButton from "../General/CTAButton";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-circle floating-1"></div>
        <div className="floating-circle floating-2"></div>
        <div className="floating-circle floating-3"></div>
        <div className="floating-square floating-4"></div>
        <div className="floating-triangle floating-5"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🚀 AI-Powered Interview Platform</span>
          </div>
          <h1 className="hero-title">
            Master Your <span className="gradient-text">Interview Skills</span>{" "}
            with AI-Powered Mock Interviews
          </h1>
          <p className="hero-subtitle">
            Practice real-time interviews with our advanced AI system and get
            company-specific online assessments. Build confidence and land your
            dream job.
          </p>
          <div className="hero-buttons">
            <CTAButton
              onclick={() =>
                isLoggedIn ? navigate("/dashboard") : navigate("/login")
              }
              btnText={"Start Now"}
            />
            <button className="btn btn-secondary btn-large">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 5V19L19 12L8 5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="mockup-container">
            <div className="mockup-screen">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mockup-title">SimJob AI Interview</div>
              </div>
              <div className="mockup-content">
                <div className="interview-simulation">
                  <div className="ai-interviewer">
                    <div className="avatar">
                      <div className="avatar-inner"></div>
                    </div>
                    <div className="message-bubble">
                      <p>
                        "Tell me about your experience with React and how you've
                        used it in previous projects..."
                      </p>
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <div className="user-response">
                    <div className="response-controls">
                      <div className="response-indicator active"></div>
                      <span className="response-time">00:45</span>
                    </div>
                    <p>🎤 Recording your response...</p>
                    <div className="audio-wave">
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                    </div>
                  </div>
                  <div className="interview-progress">
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                    <span className="progress-text">Question 3 of 8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional floating mockup elements */}
            <div className="floating-card card-1">
              <div className="card-icon">📊</div>
              <div className="card-text">
                <div className="card-title">Performance Score</div>
                <div className="card-value">92%</div>
              </div>
            </div>

            <div className="floating-card card-2">
              <div className="card-icon">🎯</div>
              <div className="card-text">
                <div className="card-title">Skills Match</div>
                <div className="card-value">React</div>
              </div>
            </div>

            <div className="floating-card card-3">
              <div className="card-icon">⚡</div>
              <div className="card-text">
                <div className="card-title">Response Time</div>
                <div className="card-value">1.2s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
