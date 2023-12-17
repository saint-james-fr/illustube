<script lang="ts">
  import type { StageConfig } from "konva/lib/Stage";
  import Konva from "konva";
  import uploadedImage from "assets/img/CHUWANAGA006_COVER-FRONT.png";
  import { onMount } from "svelte";

  const minBlurValue = 0;
  const maxBlurValue = 25;

  const transformer = new Konva.Transformer({
    rotationSnaps: [0, 90, 180, 270],
    rotateAnchorOffset: 20,
    padding: 10,
    rotateAnchorCursor: "grab",
    rotateEnabled: true,
    rotationSnapTolerance: 5,
    borderEnabled: true,
    borderStroke: "black",
    borderStrokeWidth: 3,
    borderDash: [2, 2],
    enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
    anchorFill: "white",
    anchorStrokeWidth: 2,
    anchorCornerRadius: 10,
    anchorStroke: "blue",
    anchorSize: 10,
    centeredScaling: true,
    flipEnabled: false,
  });

  let canvasContainer: HTMLDivElement;
  let initStageConfig: StageConfig;
  let blurValue = 0;
  let img: Konva.Image;
  let stage: Konva.Stage;
  let backgroundLayer: Konva.Layer;
  let upperLayer: Konva.Layer;
  let canvasContainerScalingRatio: number;
  let innerWidth: number;
  let aspectRatio: number;
  let backgroundImage: HTMLImageElement;
  let automaticMode: boolean = true;

  $: {
    applyBlur(img, Konva.Filters.Blur, blurValue);
    canvasContainerScalingRatio = innerWidth / 1280;
  }

  // IMAGE MODIFICATIONS
  const applyBlur = (
    node: Konva.Node,
    filter: typeof Konva.Filters.Blur,
    amount: number
  ) => {
    if (!node) return;
    node.cache();
    node.filters([filter]);
    node.blurRadius(amount);
    node.getLayer()?.batchDraw();
  };

  // WHEEL EVENT

  const adjustImagePosition = (img: Konva.Image, delta: number) => {
    if (img === undefined) return;
    const oldScale = img.scaleX();
    const scaleBy = delta * 0.001;
    let newScale = oldScale + scaleBy;
    newScale = Math.max(newScale, 0.1);
    const oldPos = {
      x: img.x(),
      y: img.y(),
    };
    img.scaleX(newScale);
    img.scaleY(newScale);
    // Ajuster la position de l'image pour maintenir le centre
    const newPos = {
      x: oldPos.x - (img.width() * (newScale - oldScale)) / 2,
      y: oldPos.y - (img.height() * (newScale - oldScale)) / 2,
    };
    img.position(newPos);
  };

  const handleWheel = (e: any, img: Konva.Image) => {
    e.cancelBubble = true;
    e.evt.preventDefault();
    adjustImagePosition(img, e.evt.deltaY);

    backgroundLayer.batchDraw();
  };

  // EXPORT IMAGE
  const handleDownload = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = `${name}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportImage = () => {
    const name = "export";
    if (stage === undefined || img === undefined) return;

    // Obtenez le Transformer de la scène
    const transformer = stage.find("Transformer")[0];
    // Cachez le Transformer
    transformer.visible(false);
    // Redessinez la scène pour que le Transformer disparaisse
    stage.batchDraw();
    // Exportez la scène
    const uri = stage.toDataURL();
    handleDownload(uri, name);
    // Réaffichez le Transformer
    transformer.visible(true);
    // Redessinez la scène pour que le Transformer réapparaisse
    stage.batchDraw();
  };

  // HANDLES RESPONSIVENESS

  const updateDimensions = () => {
    stage.width(canvasContainer.clientWidth);
    stage.height(canvasContainer.clientHeight);
    img.width(stage.width());
    img.height(stage.width() / aspectRatio);
  };

  // Konva Flow

  const createStage = (config: StageConfig) => {
    stage = new Konva.Stage(config);
  };

  transformer.on("transformstart", () => {
    transformer.anchorFill("blue");
  });
  transformer.on("transformend", () => {
    transformer.anchorFill("white");
  });

  transformer.on("dragstart", () => {
    transformer.anchorFill("blue");
  });
  transformer.on("dragend", () => {
    transformer.anchorFill("white");
  });

  const calculateImageDimensions = () => {
    let canvasContainerHeightPercentage = stage.height() / 100;
    let blockPadding = 10 * canvasContainerHeightPercentage;
    aspectRatio = backgroundImage.width / backgroundImage.height;
    let calculatedWidth, calculatedHeight;

    if (automaticMode) {
      calculatedWidth = stage.width();
      calculatedHeight = stage.width() / aspectRatio;
    } else {
      calculatedHeight = stage.height() - blockPadding * 2;
      calculatedWidth = calculatedHeight * aspectRatio;
    }

    return { calculatedWidth, calculatedHeight };
  };

  const calculateImagePosition = (width: number, height: number) => {
    let calculatedXPosition, calculatedYPosition;

    if (automaticMode) {
      calculatedXPosition = 0;
      calculatedYPosition = (stage.height() / 2) * -1;
    } else {
      calculatedXPosition = stage.width() / 2 - width / 2;
      calculatedYPosition = stage.height() / 2 - height / 2;
    }

    return { calculatedXPosition, calculatedYPosition };
  };

  const createKonvaImage = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    return new Konva.Image({
      x,
      y,
      image: backgroundImage,
      width,
      height,
      draggable: true,
    });
  };

  const createBackgroundLayer = () => {
    let layer = new Konva.Layer({ name: "backgroundLayer" });
    layer.on("mouseover", () => {
      document.body.style.cursor = "grab";
    });
    layer.on("mouseout", () => {
      document.body.style.cursor = "default";
    });
    return layer;
  };

  const importImage = (imagePath: string) => {
    backgroundImage = new Image();
    backgroundImage.src = imagePath;

    backgroundImage.onload = () => {
      let { calculatedWidth, calculatedHeight } = calculateImageDimensions();
      let { calculatedXPosition, calculatedYPosition } = calculateImagePosition(
        calculatedWidth,
        calculatedHeight
      );

      img = createKonvaImage(
        calculatedXPosition,
        calculatedYPosition,
        calculatedWidth,
        calculatedHeight
      );

      backgroundLayer = createBackgroundLayer();
      backgroundLayer.add(img);
      backgroundLayer.add(transformer);
      transformer.nodes([img]);
      stage.add(backgroundLayer);
      stage.on("wheel", (event) => handleWheel(event, img));
      backgroundLayer.draw();
    };
  };

  onMount(() => {
    initStageConfig = {
      container: canvasContainer,
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight,
    };
    createStage(initStageConfig);
    // TODO : add a real input to upload image
    importImage(uploadedImage);
  });
</script>

<svelte:window bind:innerWidth on:resize={updateDimensions} />

<div class="workzone">
  <div
    bind:this={canvasContainer}
    id="canvasContainer"
    style="transform: scale({canvasContainerScalingRatio})"
  ></div>
  <div class="settings">
    <input
      type="range"
      min={minBlurValue}
      max={maxBlurValue}
      bind:value={blurValue}
    />
    <button on:click={exportImage}>Download</button>
  </div>
</div>

<style lang="scss">
  .workzone {
    width: 100%;
    height: 100vh;
    padding-inline: 2rem;
    display: grid;
    grid-template-columns: 4fr 1fr;
    background-color: gray;
  }

  #canvasContainer {
    width: 100%;
    border: 1px blue solid;
    aspect-ratio: 16 / 9;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1280px;
  }
  .settings {
    width: 100%;
    height: 100%;
    padding-inline: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: pink;

    input[type="range"] {
      width: 100%;
      height: 30px;
      background-color: #d7dcdf;
      border: none;
      -webkit-appearance: none;
      border-radius: 5px;
      outline: none;
      padding: 0;
      margin: 7px;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 17px;
      height: 33px;
      border: none;
      border-radius: 2px;
      background: #3498db;
      cursor: pointer;
      transition: background 0.15s ease-in-out;
    }
  }
</style>
