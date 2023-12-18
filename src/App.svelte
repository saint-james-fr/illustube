<script lang="ts">
  import type { StageConfig } from "konva/lib/Stage";
  import Konva from "konva";
  import uploadedImage from "assets/img/CHUWANAGA006_COVER-FRONT.png";
  import { onMount } from "svelte";
  import { settingsStore, stageConfigStore } from "stores";
  import Settings from "components/Settings/Settings.svelte";
  import type { Filter } from "konva/lib/Node";

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

  const applyFilters = (node: Konva.Node, filters: Filter[], values: any[]) => {
    if (!node) return;
    node.filters(filters);

    // Appliquer les valeurs pour chaque filtre
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const value = values[i];
      switch (filter) {
        case Konva.Filters.Blur:
          node.blurRadius(value);
          break;
        case Konva.Filters.Brighten:
          node.brightness(value);
          break;
        case Konva.Filters.Contrast:
          node.contrast(value);
          break;
        case Konva.Filters.HSL:
          node.hue(value);
          break;
        case Konva.Filters.Noise:
          node.noise(value);
          break;
        default:
          break;
      }
    }
    node.cache();

    node.getLayer()?.batchDraw();
  };

  const applyFilterWithoutValue = (
    filters: FilterType[],
    filter: FilterType,
    values: (number | null)[],
    value = null
  ) => {
    if ($settingsStore.imageSettings.invertValue) {
      filters.push(filter);
      values.push(value);
    } else {
      let index = filters.indexOf(filter);
      filters.splice(index, 1);
      values.splice(index, 1);
    }
  };

  $: {
    const filters = [
      Konva.Filters.Blur,
      Konva.Filters.Brighten,
      Konva.Filters.Contrast,
      Konva.Filters.HSL,
      Konva.Filters.Noise,
    ];
    const values = [
      $settingsStore.imageSettings.blurValue,
      $settingsStore.imageSettings.brightnessValue,
      $settingsStore.imageSettings.contrastValue,
      $settingsStore.imageSettings.hueRotateValue,
      $settingsStore.imageSettings.noiseValue,
    ] as (number | null)[];

    // Ajouter le filtre Invert si invertValue est vrai
    if ($settingsStore.imageSettings.invertValue) {
      filters.push(Konva.Filters.Invert);
      values.push(null);
    } else {
      let index = filters.indexOf(Konva.Filters.Invert);
      filters.splice(index, 1);
      values.splice(index, 1);
    }

    applyFilters(img, filters, values);
    applyFilterWithoutValue(filters, Konva.Filters.Invert, values);
    if (img) img.opacity($settingsStore.imageSettings.opacityValue);

    canvasContainerScalingRatio = innerWidth / 1280;
    if (canvasContainerScalingRatio > 1) {
      canvasContainerScalingRatio = 1;
    }
  }

  // IMAGE MODIFICATIONS

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

  const createLayer = () => {
    let layer = new Konva.Layer();
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

      backgroundLayer = createLayer();
      backgroundLayer.add(img);
      backgroundLayer.add(transformer);
      transformer.nodes([img]);
      stage.add(backgroundLayer);
      backgroundLayer.draw();
      stage.on("wheel", (event) => handleWheel(event, img));
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
  <div class="zone">
    <div
      bind:this={canvasContainer}
      id="canvasContainer"
      style="transform: scale({canvasContainerScalingRatio})"
    ></div>
  </div>
  <Settings {stage} {img} />
</div>

<style lang="scss">
  .workzone {
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: auto 200px;
    background-color: $workzone-background;
  }

  .zone {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #canvasContainer {
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: $black;
    max-width: 1000px;
  }

</style>
