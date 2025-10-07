import SplitText from "./SplitText";

interface WelcomeSectionProps {
  userName: string;
}

export default function WelcomeSection({ userName }: WelcomeSectionProps) {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div
      style={{
        paddingLeft: "1rem",
        paddingRight: "3rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <SplitText
        text={`Welcome back, ${userName}!`}
        className="welcome-text"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        textAlign="left"
        onLetterAnimationComplete={handleAnimationComplete}
      />
      <p
        style={{
          fontSize: "16px",
          color: "#6b7280",
          marginTop: "8px",
          marginLeft: "4px",
          paddingLeft: "2rem",
        }}
      >
        Here's what's happening with your jobs today.
      </p>
    </div>
  );
}
