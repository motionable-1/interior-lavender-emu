import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slow floating gradient orbs
  const orb1X = 25 + Math.sin(time * 0.3) * 10;
  const orb1Y = 20 + Math.cos(time * 0.25) * 8;
  const orb2X = 70 + Math.cos(time * 0.2) * 12;
  const orb2Y = 65 + Math.sin(time * 0.35) * 10;
  const orb3X = 50 + Math.sin(time * 0.15) * 15;
  const orb3Y = 85 + Math.cos(time * 0.3) * 8;

  // Subtle overall fade in
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      {/* Base warm off-white */}
      <AbsoluteFill style={{ backgroundColor: "#FAF9F5" }} />

      {/* Floating gradient orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at ${orb1X}% ${orb1Y}%, rgba(56,152,236,0.08), transparent 40%),
            radial-gradient(circle at ${orb2X}% ${orb2Y}%, rgba(0,130,243,0.06), transparent 45%),
            radial-gradient(circle at ${orb3X}% ${orb3Y}%, rgba(217,119,87,0.05), transparent 35%)
          `,
        }}
      />

      {/* Subtle dot grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(20,20,19,0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.5 + Math.sin(time * 0.5) * 0.1,
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => {
        const seed = i * 47.3;
        const x = 10 + (seed * 13.7) % 80;
        const baseY = 10 + (seed * 7.3) % 80;
        const y = baseY + Math.sin(time * (0.4 + i * 0.1) + seed) * 5;
        const size = 40 + (i * 20) % 60;
        const rotation = time * (5 + i * 3) + seed;
        const opacity = 0.03 + Math.sin(time * 0.3 + i) * 0.01;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              border: `1px solid rgba(56,152,236,${opacity * 3})`,
              borderRadius: i % 2 === 0 ? "50%" : "8px",
              transform: `rotate(${rotation}deg)`,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
