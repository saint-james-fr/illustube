import Konva from "konva";
import { hideTransformer, showTransformer } from "./konva/transformer";
import { filterSettingStore, konvaStore } from "stores";
import { get } from "svelte/store";
// imageDownloader

const download = (uri: string, name: string): void => {
  const link = document.createElement("a");
  link.download = `${name}.png`;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportStage = (stage: Konva.Stage, pixelRatio: number): string => {
  return stage.toDataURL({ pixelRatio });
};

export const exportImage = (
  stage: Konva.Stage,
  img: Konva.Image,
  pixelRatio: number
): void => {
  const name = "export";
  if (stage === undefined || img === undefined) return;
  hideTransformer(stage);
  // Upscale hack
  if (
    get(filterSettingStore).blurRadius == 0 ||
    get(filterSettingStore).pixelateValue == 0
  ) {
    get(konvaStore).bgImage.cache();
  }
  // Exportez la scène
  setTimeout(() => {
    const uri = exportStage(stage, pixelRatio);
    download(uri, name);
    showTransformer(stage);
  }, 2000);
  // Réaffichez le Transformer
};
// Compare this snippet from src/lib/konva/layer.ts:
