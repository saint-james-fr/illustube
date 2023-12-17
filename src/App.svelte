<script lang="ts">
  import type { StageConfig } from "konva/lib/Stage";
  import Konva from "konva";
  import uploadedImage from "assets/img/CHUWANAGA006_COVER-FRONT.png";
  import { onMount } from "svelte";
  import { settingsStore, stageConfigStore } from "stores";

  const imageSettingsModel = {
    minBlurValue: 0,
    maxBlurValue: 25,
    minBrightnessValue: 0,
    maxBrightnessValue: 100,
    minContrastValue: 0,
    maxContrastValue: 2,
    minGrayscaleValue: 0,
    maxGrayscaleValue: 1,
    minHueRotateValue: 0,
    maxHueRotateValue: 360,
    minInvertValue: 0,
    maxInvertValue: 1,
    minOpacityValue: 0,
    maxOpacityValue: 1,
    minSaturateValue: 0,
    maxSaturateValue: 2,
    minNoiseValue: 0,
    maxNoiseValue: 0.3,
  };

  const {
    minBlurValue,
    maxBlurValue,
    minBrightnessValue,
    maxBrightnessValue,
    minContrastValue,
    maxContrastValue,
    minGrayscaleValue,
    maxGrayscaleValue,
    minHueRotateValue,
    maxHueRotateValue,
    minInvertValue,
    maxInvertValue,
    minNoiseValue,
    maxNoiseValue,
    minOpacityValue,
    maxOpacityValue,
    minSaturateValue,
    maxSaturateValue,
  } = imageSettingsModel;

  const transformer = new Konva.Transformer({
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

  let canvasContainer: HTMLDivElement;
  let img: Konva.Image;
  let stage: Konva.Stage;
  let backgroundLayer: Konva.Layer;
  let canvasContainerScalingRatio: number;
  let innerWidth: number;
  let aspectRatio: number;
  let backgroundImage: HTMLImageElement;
  let blurActivated: boolean = false;

  let blurValue = 0;

  $: {
    applyBlur(img, Konva.Filters.Blur);
    applyBrightness(
      img,
      Konva.Filters.Brighten,
      $settingsStore.imageSettings.brightnessValue
    );
    applyContrast(
      img,
      Konva.Filters.Contrast,
      $settingsStore.imageSettings.contrastValue
    );
    applyGrayscale(
      img,
      Konva.Filters.Grayscale,
      $settingsStore.imageSettings.grayscaleValue
    );
    applyHueRotate(
      img,
      Konva.Filters.HSL,
      $settingsStore.imageSettings.hueRotateValue
    );
    applyInvert(img, Konva.Filters.Invert);
    applyNoise(
      img,
      Konva.Filters.Noise,
      $settingsStore.imageSettings.noiseValue
    );
    canvasContainerScalingRatio = innerWidth / 1280;
    if (canvasContainerScalingRatio > 1) {
      canvasContainerScalingRatio = 1;
    }
  }

  // IMAGE MODIFICATIONS
  const applyBlur = (
    node: Konva.Node,
    filter: typeof Konva.Filters.Blur,
  ) => {
    if (!node) return;
    node.cache();
    node.filters([filter]);
    node.blurRadius($settingsStore.imageSettings.blurValue);
    // if (!blurActivated) {
    //   const previousScaleX = node.scaleX();
    //   const previousScaleY = node.scaleY();
    //   node.scaleX(1.1 * previousScaleX);
    //   node.scaleY(1.1 * previousScaleY);
    //   blurActivated = true;
    // }
    console.log(blurActivated)
    console.log(node.scaleX())
    console.log(node)
    node.getLayer()?.batchDraw();
  };

  const applyBrightness = (
    node: Konva.Node,
    filter: typeof Konva.Filters.Brighten,
    amount: number
  ) => {
    if (!node) return;
    node.cache();
    node.filters([filter]);
    node.brightness(amount);
    node.getLayer()?.batchDraw();
  };

  const applyContrast = (
    node: Konva.Node,
    filter: typeof Konva.Filters.Contrast,
    amount: number
  ) => {
    if (!node) return;
    node.cache();
    node.filters([filter]);
    node.contrast(amount);
    node.getLayer()?.batchDraw();
  };

  const applyGrayscale = (
    node: Konva.Node,
    filter: typeof Konva.Filters.Grayscale,
    amount: number
  ) => {
    if (!node) return;
    node.cache();
    node.filters([filter]);
    node.getLayer()?.batchDraw();
  };

  const applyHueRotate = (
    node: Konva.Node,
    filter: typeof Konva.Filters.HSL,
    amount: number
  ) => {
    if (!node) return;
    node.cache();
    node.filters([filter]);
    node.hue(amount);
    node.getLayer()?.batchDraw();
  };

  const applyInvert = (
    node: Konva.Node,
    filter: typeof Konva.Filters.Invert
  ) => {
    if (!node) return;
    node.cache();
    node.filters([filter]);
    node.getLayer()?.batchDraw();
  };

  const applyNoise = (
    node: Konva.Node,
    filter: typeof Konva.Filters.Noise,
    amount: number
  ) => {
    if (!node) return;
    node.cache();
    node.filters([filter]);
    node.noise(amount);
    node.getLayer()?.batchDraw();
  };

  // WHEEL EVENT

  const adjustImagePosition = (img: Konva.Image, delta: number) => {
    if (img === undefined) return;
    const oldScale = img.scaleX();
    const scaleBy = -1 * delta * 0.002;
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
    transformer.anchorFill("#1e90ff");
  });
  transformer.on("transformend", () => {
    transformer.anchorFill("#fffaf2");
  });

  transformer.on("dragstart", () => {
    transformer.anchorFill("#1e90ff");
  });
  transformer.on("dragend", () => {
    transformer.anchorFill("#fffaf2");
  });

  const calculateImageDimensions = () => {
    let canvasContainerHeightPercentage = stage.height() / 100;
    let blockPadding = 10 * canvasContainerHeightPercentage;
    aspectRatio = backgroundImage.width / backgroundImage.height;
    let calculatedWidth, calculatedHeight;

    if ($settingsStore.automaticMode) {
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

    if ($settingsStore.automaticMode) {
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
    $stageConfigStore = {
      container: canvasContainer,
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight,
    };
    createStage($stageConfigStore);
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
    <form>
      <div class="line">
        <label for="automaticMode">Automatic</label>
        <input
          type="checkbox"
          id="automaticMode"
          bind:checked={$settingsStore.automaticMode}
        />
      </div>
      <div class="line">
        <label for="blurValue">Blur</label>
        <input
          type="range"
          id="blurValue"
          min={minBlurValue}
          max={maxBlurValue}
          bind:value={$settingsStore.imageSettings.blurValue}
        />
      </div>
      <div class="line">
        <label for="brightnessValue">Brightness</label>
        <input
          type="range"
          id="brightnessValue"
          min={minBrightnessValue}
          max={maxBrightnessValue}
          bind:value={$settingsStore.imageSettings.brightnessValue}
        />
      </div>

      <div class="line">
        <label for="contrastValue">Contrast</label>
        <input
          type="range"
          id="contrastValue"
          min={minContrastValue}
          max={maxContrastValue}
          bind:value={$settingsStore.imageSettings.contrastValue}
        />
      </div>

      <div class="line">
        <label for="grayscaleValue">Grayscale</label>
        <input
          type="range"
          id="grayscaleValue"
          min={minGrayscaleValue}
          max={maxGrayscaleValue}
          bind:value={$settingsStore.imageSettings.grayscaleValue}
        />
      </div>

      <div class="line">
        <label for="hueRotateValue">Hue Rotate</label>
        <input
          type="range"
          id="hueRotateValue"
          min={minHueRotateValue}
          max={maxHueRotateValue}
          bind:value={$settingsStore.imageSettings.hueRotateValue}
        />
      </div>

      <div class="line">
        <label for="invertValue">Invert</label>
        <input
          type="range"
          id="invertValue"
          min={minInvertValue}
          max={maxInvertValue}
          bind:value={$settingsStore.imageSettings.invertValue}
        />
      </div>

      <div class="line">
        <label for="opacityValue">Opacity</label>
        <input
          type="range"
          id="opacityValue"
          min={minOpacityValue}
          max={maxOpacityValue}
          bind:value={$settingsStore.imageSettings.opacityValue}
        />
      </div>

      <div class="line">
        <label for="saturateValue">Saturate</label>
        <input
          type="range"
          id="saturateValue"
          min={minSaturateValue}
          max={maxSaturateValue}
          bind:value={$settingsStore.imageSettings.saturateValue}
        />
      </div>
      <div class="line">
        <label for="noiseValue">Noise</label>
        <input
          type="range"
          id="noiseValue"
          min={minNoiseValue}
          max={maxNoiseValue}
          step="0.01"
          bind:value={$settingsStore.imageSettings.noiseValue}
        />
      </div>
    </form>
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
    background-color: $workzone-background;
  }

  #canvasContainer {
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: $black;
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
    background-color: $workzone-settings;

    input[type="range"] {
      width: 100%;
      height: 20px;
      background-color: $workzone-settings-button;
      border: none;
      -webkit-appearance: none;
      border-radius: 1px;
      outline: none;
      padding: 0;
      cursor: pointer;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 8px;
      height: 20px;
      border: none;
      border-radius: 1px;
      background: $workzone-border;
      cursor: pointer;
      transition: background 0.15s ease-in-out;
    }

    .line {
      font-size: 0.8rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 1rem;

      & > label {
        width: 100%;
      }
    }
  }
</style>
