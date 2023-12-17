import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import Konva from "konva";

const initialImageSettings: ImageSettings = {
  blurValue: 0,
  brightnessValue: 0,
  contrastValue: 0,
  grayscaleValue: 0,
  hueRotateValue: 0,
  invertValue: 0,
  opacityValue: 0,
  saturateValue: 0,
  noiseValue: 0,
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

export const layersStore = writable([]);
export const settingsStore: Writable<SettingsType> = writable(initialSettings);
export const stageConfigStore: Writable<Konva.StageConfig> =
  writable(initialStageConfig);
