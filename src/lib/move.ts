import type Konva from "konva";

const zoom = (
  img: Konva.Image,
  newScale: number,
  oldScale: number,
  cursorPos: { x: number; y: number }
): { oldPos: { x: number; y: number }; newPos: { x: number; y: number } } => {
  const oldPos = {
    x: img.x(),
    y: img.y(),
  };
  newScale = Math.max(newScale, 0.1);
  img.scaleX(newScale);
  img.scaleY(newScale);
  const newPos = {
    x: cursorPos.x - (cursorPos.x - oldPos.x) * (newScale / oldScale),
    y: cursorPos.y - (cursorPos.y - oldPos.y) * (newScale / oldScale),
  };
  return { oldPos, newPos };
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
  if (wheelBlocked && delta > 0) return;

  const imageWidth = img.width() * img.scaleX();
  const stageWidth = layer.getStage().width();
  const stageHeight = layer.getStage().height();

  const cursorPos = layer.getStage().getPointerPosition() || {
    x: stageWidth / 2,
    y: stageHeight / 2,
  };

  if (imageWidth < stageWidth && delta > 0) {
    const oldScale = img.scaleX();
    const newScale = stageWidth / img.width() + 0.01;
    const { newPos } = zoom(img, newScale, oldScale, cursorPos);
    img.position(newPos);
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
    const { newPos } = zoom(img, newScale, oldScale, cursorPos);
    img.position(newPos);
  }
  layer.batchDraw();
};
