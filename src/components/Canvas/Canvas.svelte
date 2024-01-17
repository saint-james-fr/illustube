<script lang="ts">
  import BackgroundImage from "components/BackgroundImage/BackgroundImage.svelte";
  import ColorBackgroundRect from "components/ColorBackgroundRect/ColorBackgroundRect.svelte";
  import MainImage from "components/MainImage/MainImage.svelte";
  import { onMount, tick } from "svelte";
  import { userStore, konvaStore, imageStore } from "stores";
  import { handleWheel } from "lib/konva/move";
  import { Stage, Layer } from "svelte-konva";
  import { mobileDevice } from "lib/mobile";
  import type Konva from "konva";

  let canvasContainer: HTMLDivElement;
  let canvasContainerScalingRatio: number;
  let innerWidth: number;
  let stage: Konva.Stage;
  let backgroundLayer: Konva.Layer;
  let mainLayer: Konva.Layer;
  let backgroundColorRectLayer: Konva.Layer;

  let sceneWidth: number;
  let sceneHeight: number;

  $: {
    // This is reactively updated when the user resizes the page
    canvasContainerScalingRatio = Math.min(innerWidth / 1280, 1);
    if (mobileDevice(innerWidth)) {
      canvasContainerScalingRatio = 1;
    }
    // We store the konva stage and layers in the store so that we can access them from other components
    $konvaStore.stage = stage;
    $konvaStore.bgLayer = backgroundLayer;
    $konvaStore.mainLayer = mainLayer;
    $konvaStore.backgroundColorRectLayer = backgroundColorRectLayer;
    // We react to changes to the user setting to hide or show the main image
    if (mainLayer) {
      if ($userStore.hideMainImage) {
        mainLayer.hide();
      } else {
        mainLayer.show();
      }
    }
  }

  const handleResize = () => {
    if (!canvasContainer || !stage || !sceneHeight || !sceneWidth) return;

    const parentWidth = canvasContainer.offsetWidth;
    console.log("parentWidth", parentWidth);
    const scale = parentWidth / sceneWidth;
    console.log("scale", scale);

    stage.width(sceneWidth * scale);
    stage.height(sceneHeight * scale);
    stage.scale({ x: scale, y: scale });


  };

  onMount(async () => {
    // We wait for the image to load before we can calculate the scene width and height
    sceneWidth = canvasContainer.offsetWidth;
    sceneHeight = sceneWidth / 16 * 9;
  });
</script>

<svelte:window bind:innerWidth on:resize={handleResize} />

<div class="canvas_container" bind:this={canvasContainer}>
  {#if $imageStore.main.loaded}
    <Stage
      bind:handle={stage}
      config={{ width: sceneWidth, height: sceneHeight }}
      on:wheel={(event) => {
        if (!$konvaStore.bgImage) return;
        handleWheel(event.detail, $konvaStore.bgImage, $konvaStore.bgLayer);
      }}
    >
      <Layer bind:handle={backgroundColorRectLayer}>
        <ColorBackgroundRect {canvasContainer} />
      </Layer>
      <Layer bind:handle={backgroundLayer}>
        <BackgroundImage {canvasContainer} />
      </Layer>
      <Layer bind:handle={mainLayer}>
        <MainImage {canvasContainer} />
      </Layer>
    </Stage>
  {/if}
</div>

<style lang="scss">
  .canvas_container {
    width: 90%;
    aspect-ratio: 16 / 9;
    background-color: $black;
    transform-origin: center center;
    display: flex;
    align-items: center;
    @include until($breakpoint) {
      width: 100%;
    }
  }
</style>
