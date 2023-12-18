import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import Konva from "konva";

export const initialImageSettings: ImageSettings = {
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

export const initialImageSettings2: ImageSettings = {
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

export const layersStore = writable([]);
export const settingsStore: Writable<SettingsType> = writable(initialSettings);
export const stageConfigStore: Writable<Konva.StageConfig> =
  writable(initialStageConfig);
