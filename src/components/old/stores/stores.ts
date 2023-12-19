import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import Konva from "konva";

const initialImageSettings: ImageSettings = {
  blurValue: 0,
  brightnessValue: 0,
  contrastValue: 0,
  hueRotateValue: 0,
  invertValue: false,
  opacityValue: 1,
  pixelateValue: 1,
  noiseValue: 0,
  kaleidoscopeValue: false,
};

const initialStageConfig = {
  container: "canvasContainer",
  width: 0,
  height: 0,
};

const initialSettings = {
  automaticMode: true,
  imageSettings: initialImageSettings,
};

const initialTransformer = new Konva.Transformer({
  rotationSnaps: [0, 90, 180, 270],
  rotateAnchorOffset: 20,
  padding: 10,
  rotateAnchorCursor: "grab",
  rotateEnabled: true,
  rotationSnapTolerance: 5,
  borderEnabled: true,
  borderStroke: "#fffaf2",
  borderStrokeWidth: 3,
  borderDash: [1, 1],
  enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
  anchorFill: "#fffaf2",
  anchorStrokeWidth: 2,
  anchorCornerRadius: 10,
  anchorStroke: "#1e90ff",
  anchorSize: 10,
  centeredScaling: true,
  flipEnabled: false,
});

export const layersStore = writable([]);
export const settingsStore: Writable<SettingsType> = writable(initialSettings);
export const stageConfigStore: Writable<Konva.StageConfig> =
  writable(initialStageConfig);
export const transformerStore: Writable<Konva.Transformer> = writable(initialTransformer);
