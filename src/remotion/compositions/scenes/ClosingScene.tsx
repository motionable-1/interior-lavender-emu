import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Img } from "remotion";
import { FadeInWords, BlurReveal } from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";
import { loadFont as loadHeading } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as loadBody } from "@remotion/google-fonts/DMSans";

const CLAUDE_FAVICON = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/claude-skills/1773459291294_m8ztgzzvr9_claude_favicon.png";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily: headingFont } = loadHeading();
  const { fontFamily: bodyFont } = loadBody();
  const time = frame / fps;

  // Logo entrance
  const logoScale = interpolate(frame, [5, 25], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });
  const logoOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button entrance
  const ctaOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [55, 72], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ctaScale = interpolate(frame, [55, 72], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // URL entrance
  const urlOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = 0.7 + Math.sin(time * 2.5) * 0.3;

  // Decorative rings
  const ring1Scale = interpolate(frame, [10, 50], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ring2Scale = interpolate(frame, [20, 60], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Decorative rings behind logo */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "1px solid rgba(56,152,236,0.1)",
          transform: `scale(${ring1Scale})`,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "25%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          border: "1px solid rgba(56,152,236,0.06)",
          transform: `scale(${ring2Scale})`,
          opacity: 0.4,
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          top: "26%",
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Glow color="#3898EC" intensity={25 * glowPulse} layers={2}>
          <Img
            src={CLAUDE_FAVICON}
            style={{ width: 72, height: 72 }}
          />
        </Glow>
      </div>

      {/* Main CTA text */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          textAlign: "center",
          width: "85%",
        }}
      >
        <BlurReveal
          stagger={0.04}
          duration={0.6}
          startFrom={20}
          className="text-balance"
          style={{
            fontFamily: headingFont,
            fontSize: 68,
            fontWeight: 400,
            color: "#141413",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Start Building Skills
        </BlurReveal>

        <FadeInWords
          stagger={0.06}
          duration={0.5}
          startFrom={40}
          style={{
            fontFamily: bodyFont,
            fontSize: 24,
            fontWeight: 400,
            color: "#5E5D59",
            lineHeight: 1.5,
            marginTop: 20,
            maxWidth: 600,
            margin: "20px auto 0",
          }}
        >
          Package your expertise. Automate with confidence.
        </FadeInWords>
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: "absolute",
          top: "68%",
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px) scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 20,
            fontWeight: 600,
            color: "#FAF9F5",
            backgroundColor: "#141413",
            padding: "16px 40px",
            borderRadius: 10,
            letterSpacing: "0.02em",
            boxShadow: "0 4px 20px rgba(20,20,19,0.15)",
          }}
        >
          Start using skills →
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          top: "78%",
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 16,
            fontWeight: 400,
            color: "#0082F3",
            letterSpacing: "0.05em",
          }}
        >
          claude.com/skills
        </div>
      </div>

      {/* Floating dots */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 15 + i * 18;
        const baseY = 88;
        const dotY = baseY + Math.sin(time * 1.2 + i * 1.3) * 4;
        const dotOpacity = interpolate(frame, [75 + i * 5, 90 + i * 5], [0, 0.25], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${dotY}%`,
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#3898EC",
              opacity: dotOpacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
