import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Artifact,
  useCurrentFrame,
  Audio,
  interpolate,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "../library/components/layout/Transition";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { Background } from "./scenes/Background";
import { OpeningScene } from "./scenes/OpeningScene";
import { FeatureTransition } from "./scenes/FeatureTransition";
import { FeatureCard } from "./scenes/FeatureCard";
import { ClosingScene } from "./scenes/ClosingScene";

const MUSIC_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1773459317814_mskmgjri2_music_Ambient_corporate_te.mp3";
const SFX_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773459294626_ht7pjra1pk5_sfx_subtle_futuristic_UI_tech_whoo.mp3";

// Icon URLs
const ICON_PACKAGE =
  "https://api.iconify.design/lets-icons/package-box.svg?color=%233898EC&width=48";
const ICON_DEVICES =
  "https://api.iconify.design/lucide/monitor-smartphone.svg?color=%230082F3&width=48";
const ICON_LAYERS =
  "https://api.iconify.design/lucide/layers.svg?color=%23D97757&width=48";

// Transition duration
const TRANS = 15;

// Scene durations
const OPENING = 120;
const FEAT_TRANS_1 = 40;
const FEATURE_1 = 130;
const FEAT_TRANS_2 = 40;
const FEATURE_2 = 130;
const FEAT_TRANS_3 = 40;
const FEATURE_3 = 130;
const CLOSING = 130;

// Total = sum(scenes) - sum(transitions)
// 8 scenes: 120+40+130+40+130+40+130+130 = 760
// 7 transitions × 15 = 105
// Total = 760 - 105 = 655 frames ≈ 21.8s at 30fps

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      {/* Persistent background layer */}
      <AbsoluteFill>
        <Background />
      </AbsoluteFill>

      {/* Scene transitions */}
      <TransitionSeries>
        {/* Scene 1: Opening */}
        <TransitionSeries.Sequence durationInFrames={OPENING}>
          <OpeningScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* Feature 1 Intro */}
        <TransitionSeries.Sequence durationInFrames={FEAT_TRANS_1}>
          <FeatureTransition featureNumber="01" label="Capture & Package" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* Feature 1: Capture Procedures */}
        <TransitionSeries.Sequence durationInFrames={FEATURE_1}>
          <FeatureCard
            number="01"
            title="Capture & Package Procedures"
            description="Turn your company's best practices, workflows, and procedures into reusable skills that Claude executes with precision every time."
            iconUrl={ICON_PACKAGE}
            accentColor="#3898EC"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* Feature 2 Intro */}
        <TransitionSeries.Sequence durationInFrames={FEAT_TRANS_2}>
          <FeatureTransition featureNumber="02" label="Cross-Platform" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* Feature 2: Cross-Platform */}
        <TransitionSeries.Sequence durationInFrames={FEATURE_2}>
          <FeatureCard
            number="02"
            title="Works Everywhere, Seamlessly"
            description="Deploy once, use anywhere. Skills work identically across Claude.ai, Claude Code, and the API — zero modifications needed."
            iconUrl={ICON_DEVICES}
            accentColor="#0082F3"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* Feature 3 Intro */}
        <TransitionSeries.Sequence durationInFrames={FEAT_TRANS_3}>
          <FeatureTransition
            featureNumber="03"
            label="Skill Stacking"
            accentColor="#D97757"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* Feature 3: Intelligent Skill Stacking */}
        <TransitionSeries.Sequence durationInFrames={FEATURE_3}>
          <FeatureCard
            number="03"
            title="Intelligent Skill Stacking"
            description="Combine multiple skills into powerful multi-step workflows. Claude chains capabilities together for complex automation that just works."
            iconUrl={ICON_LAYERS}
            accentColor="#D97757"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* Closing CTA */}
        <TransitionSeries.Sequence durationInFrames={CLOSING}>
          <ClosingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Background music - fade in */}
      <Audio
        src={MUSIC_URL}
        volume={(f) =>
          interpolate(f, [0, 30, 600, 655], [0, 0.35, 0.35, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* Transition SFX at scene changes */}
      <Sequence from={105}>
        <Audio src={SFX_URL} volume={0.15} />
      </Sequence>
      <Sequence from={270}>
        <Audio src={SFX_URL} volume={0.12} />
      </Sequence>
      <Sequence from={430}>
        <Audio src={SFX_URL} volume={0.12} />
      </Sequence>
    </>
  );
};
