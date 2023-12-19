import type Konva from "konva";

const centeredZoomOnWheel = (
  img: Konva.Image,
  newScale: number,
  oldScale: number
) => {
  newScale = Math.max(newScale, 0.1);
  const oldPos = {
    x: img.x(),
    y: img.y(),
  };
  img.scaleX(newScale);
  img.scaleY(newScale);
  // Reposition
  const newPos = {
    x: oldPos.x - (img.width() * (newScale - oldScale)) / 2,
    y: oldPos.y - (img.height() * (newScale - oldScale)) / 2,
  };
  img.position(newPos);
};

const blockHorizontalMove = (img: Konva.Image, layer: Konva.Layer) => {
  const imageWidth = img.width() * img.scaleX();
  const stageWidth = layer.getStage().width();
  if (imageWidth <= stageWidth || img.x() > 0) {
    img.x(0);
  }
  if (img.x() + imageWidth < stageWidth) {
    img.x(stageWidth - imageWidth);
  }
};

const blockVerticalMove = (img: Konva.Image, layer: Konva.Layer) => {
  const imageHeight = img.height() * img.scaleY();
  const stageHeight = layer.getStage().height();
  if (imageHeight <= stageHeight || img.y() > 0) {
    img.y(0);
  }
  if (img.y() + imageHeight < stageHeight) {
    img.y(stageHeight - imageHeight);
  }
};

export const handleDragMove = (
  event: any,
  img: Konva.Image,
  layer: Konva.Layer
) => {
  blockHorizontalMove(img, layer);
  blockVerticalMove(img, layer);
};

let wheelBlocked = false;

export const handleWheel = (e: any, img: Konva.Image, layer: Konva.Layer) => {
  // Prevent default behavior (scrolling on the page)
  const delta = e.evt.deltaY;
  e.evt.preventDefault();
  e.cancelBubble = true;
  console.log(delta)
  if (wheelBlocked && delta > 0) return;

  const imageWidth = img.width() * img.scaleX();
  const stageWidth = layer.getStage().width();

  if (imageWidth < stageWidth) {
    const oldScale = img.scaleX();
    const newScale = stageWidth / img.width() + 0.1;
    centeredZoomOnWheel(img, newScale, oldScale);
    wheelBlocked = true;
    setTimeout(() => {
      wheelBlocked = false;
    }, 1000);
  } else {
    // Zoom Factor
    const speed = 2;
    const scaleBy = (-1 * delta * speed) / 1000;
    // Zooming
    const oldScale = img.scaleX();
    let newScale = oldScale + scaleBy;
    centeredZoomOnWheel(img, newScale, oldScale);
  }
  layer.batchDraw();
};
