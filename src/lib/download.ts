import Konva from "konva";

// imageDownloader

// imageExporter (export to file)
// EXPORT IMAGE
export const handleDownload = (uri: string, name: string) => {
  const link = document.createElement("a");
  link.download = `${name}.png`;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportImage = (stage: Konva.Stage, img: Konva.Image, pixelRatio: number) => {
  const name = "export";
  if (stage === undefined || img === undefined) return;

  // Obtenez le Transformer de la scène
  const transformer = stage.find("Transformer")[0];
  // Cachez le Transformer
  if (transformer) {
    transformer?.visible(false);
    // Redessinez la scène pour que le Transformer disparaisse
    stage.batchDraw();
  }
  // Exportez la scène
  // 
  // TODO: HD MODe
  const uri = stage.toDataURL({ pixelRatio});
  handleDownload(uri, name);
  // Réaffichez le Transformer
  if (transformer) {
    transformer.visible(true);
    // Redessinez la scène pour que le Transformer réapparaisse
    stage.batchDraw();
  }
};
