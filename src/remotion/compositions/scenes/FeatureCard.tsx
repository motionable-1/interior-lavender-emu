import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, Img } from "remotion";
import { loadFont as loadBody } from "@remotion/google-fonts/DMSans";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  iconUrl: string;
  accentColor?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  title,
  description,
  iconUrl,
  accentColor = "#3898EC",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily: bodyFont } = loadBody();
  const time = frame / fps;

  // Card entrance
  const cardScale = interpolate(frame, [5, 28], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });
  const cardOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardY = interpolate(frame, [5, 28], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Number entrance
  const numberOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numberX = interpolate(frame, [15, 35], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Icon bounce in
  const iconScale = interpolate(frame, [20, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  const iconRotation = interpolate(frame, [20, 42], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Title reveal
  const titleOpacity = interpolate(frame, [28, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [28, 42], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Description reveal
  const descOpacity = interpolate(frame, [38, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [38, 52], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Ambient icon float
  const iconFloat = Math.sin(time * 1.8) * 4;

  // Accent line grows
  const lineWidth = interpolate(frame, [35, 60], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: cardOpacity,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
      }}
    >
      {/* Left side - number + accent */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "15%",
          opacity: numberOpacity,
          transform: `translateX(${numberX}px)`,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 140,
            fontWeight: 700,
            color: accentColor,
            opacity: 0.08,
            lineHeight: 1,
          }}
        >
          {number}
        </div>
      </div>

      {/* Main content area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 800,
          gap: 24,
        }}
      >
        {/* Icon in circle */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: `${accentColor}10`,
            border: `1.5px solid ${accentColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${iconScale}) rotate(${iconRotation}deg) translateY(${iconFloat}px)`,
            boxShadow: `0 8px 30px ${accentColor}15`,
          }}
        >
          <Img
            src={iconUrl}
            style={{ width: 48, height: 48 }}
          />
        </div>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            borderRadius: 2,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 42,
            fontWeight: 700,
            color: "#141413",
            lineHeight: 1.2,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 22,
            fontWeight: 400,
            color: "#5E5D59",
            lineHeight: 1.6,
            maxWidth: 620,
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
          }}
        >
          {description}
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          right: "8%",
          bottom: "15%",
          width: 60,
          height: 60,
          border: `1px solid ${accentColor}15`,
          borderRadius: 12,
          transform: `rotate(${45 + time * 8}deg)`,
          opacity: interpolate(frame, [40, 55], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "12%",
          bottom: "20%",
          width: 30,
          height: 30,
          border: `1px solid ${accentColor}20`,
          borderRadius: "50%",
          transform: `rotate(${-30 + time * 12}deg)`,
          opacity: interpolate(frame, [45, 60], [0, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </div>
  );
};
