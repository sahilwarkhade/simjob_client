import React from "react";

const CTASection = () => {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #6366f1, #3b82f6)",
        padding: "4rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4); }
          100% { box-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2); }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          textAlign: "center",
          animation: "fadeIn 0.8s ease-out forwards",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Ready to Ace Your Next Interview?
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto 2rem auto",
            opacity: 0.9,
            lineHeight: "1.6",
          }}
        >
          Join thousands of successful candidates who improved their interview
          skills with <strong>SimJob</strong>.
        </p>

        {/* Button */}
        <button
          style={{
            background: "linear-gradient(90deg, #f43f5e, #fb923c)",
            color: "white",
            padding: "0.9rem 2rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
            animation: "glowPulse 2s infinite ease-in-out",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Get Started Free
        </button>

        {/* Note */}
        {/* <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "1rem" }}>
          No credit card required • 7-day free trial
        </p> */}
      </div>
    </section>
  );
};

export default CTASection;
