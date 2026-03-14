import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Img } from "remotion";
import { FadeInWords, BlurReveal } from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";
import { loadFont as loadHeading } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as loadBody } from "@remotion/google-fonts/DMSans";

const CLAUDE_FAVICON = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/claude-skills/1773459291294_m8ztgzzvr9_claude_favicon.png";

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily: headingFont } = loadHeading();
  const { fontFamily: bodyFont } = loadBody();

  // Logo entrance - scale up with spring feel
  const logoScale = interpolate(frame, [8, 30], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  const logoOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Badge slide in
  const badgeY = interpolate(frame, [15, 35], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const badgeOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line grows
  const lineWidth = interpolate(frame, [40, 70], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtle glow pulse on logo
  const glowPulse = 0.8 + Math.sin((frame / fps) * 2) * 0.2;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Logo with glow */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Glow color="#3898EC" intensity={20 * glowPulse} layers={2}>
          <Img
            src={CLAUDE_FAVICON}
            style={{
              width: 80,
              height: 80,
            }}
          />
        </Glow>
      </div>

      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: "39%",
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 16,
            fontWeight: 500,
            color: "#3898EC",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "6px 20px",
            borderRadius: 100,
            border: "1px solid rgba(56,152,236,0.25)",
            backgroundColor: "rgba(56,152,236,0.06)",
          }}
        >
          Introducing
        </div>
      </div>

      {/* Main title */}
      <div
        style={{
          position: "absolute",
          top: "46%",
          transform: "translateY(-50%)",
          textAlign: "center",
          width: "85%",
        }}
      >
        <BlurReveal
          stagger={0.04}
          duration={0.7}
          startFrom={25}
          className="text-balance"
          style={{
            fontFamily: headingFont,
            fontSize: 82,
            fontWeight: 400,
            color: "#141413",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Claude Skills
        </BlurReveal>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: "linear-gradient(90deg, transparent, #3898EC, transparent)",
            margin: "24px auto",
            borderRadius: 2,
          }}
        />

        <FadeInWords
          stagger={0.08}
          duration={0.5}
          startFrom={50}
          style={{
            fontFamily: bodyFont,
            fontSize: 28,
            fontWeight: 400,
            color: "#5E5D59",
            lineHeight: 1.5,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          Teach Claude your workflows. Get expert-level automation, every time.
        </FadeInWords>
      </div>

      {/* Bottom floating elements */}
      {[0, 1, 2].map((i) => {
        const delay = 60 + i * 8;
        const dotOpacity = interpolate(frame, [delay, delay + 15], [0, 0.4], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const dotY = Math.sin((frame / fps) * 1.5 + i * 2) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: "12%",
              left: `${38 + i * 12}%`,
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#3898EC",
              opacity: dotOpacity,
              transform: `translateY(${dotY}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
