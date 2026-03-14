import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { loadFont as loadBody } from "@remotion/google-fonts/DMSans";

interface FeatureTransitionProps {
  featureNumber: string;
  label: string;
  accentColor?: string;
}

export const FeatureTransition: React.FC<FeatureTransitionProps> = ({
  featureNumber,
  label,
  accentColor = "#3898EC",
}) => {
  const frame = useCurrentFrame();
  const { fontFamily: bodyFont } = loadBody();

  // Number scale in
  const numScale = interpolate(frame, [0, 18], [2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  const numOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Label slide up
  const labelY = interpolate(frame, [10, 25], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const labelOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line grow
  const lineScale = interpolate(frame, [5, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {/* Number */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 24,
            fontWeight: 700,
            color: accentColor,
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            letterSpacing: "0.1em",
          }}
        >
          {featureNumber}
        </div>

        {/* Line */}
        <div
          style={{
            width: 40,
            height: 2,
            backgroundColor: accentColor,
            transform: `scaleX(${lineScale})`,
            borderRadius: 2,
            opacity: 0.6,
          }}
        />

        {/* Label */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 18,
            fontWeight: 500,
            color: "#5E5D59",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
