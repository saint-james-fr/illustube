import type Konva from "konva";

export const hideTransformer = (stage: Konva.Stage) => {
  const transformer = stage.find("Transformer")[0];
  if (transformer) {
    transformer.visible(false);
    stage.batchDraw();
  }
}

export const showTransformer = (stage: Konva.Stage) => {
  const transformer = stage.find("Transformer")[0];
  if (transformer) {
    transformer.visible(true);
    stage.batchDraw();
  }
}