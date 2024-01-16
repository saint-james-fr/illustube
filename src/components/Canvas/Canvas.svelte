<script lang="ts">
  import BackgroundImage from "components/BackgroundImage/BackgroundImage.svelte";
  import { userStore, konvaStore, appStore } from "stores";
  import { handleWheel } from "lib/konva/move";
  import { Stage, Layer } from "svelte-konva";
  import type Konva from "konva";
  import MainImage from "components/MainImage/MainImage.svelte";

  let canvasContainer: HTMLDivElement;
  let canvasContainerScalingRatio: number;
  let innerWidth: number;
  let stage: Konva.Stage;
  let backgroundLayer: Konva.Layer;
  let mainLayer: Konva.Layer;

  $: {
    // This is reactively updated when the user resizes the page
    canvasContainerScalingRatio = Math.min(innerWidth / 1280, 1);
    // We store the konva stage and layers in the store so that we can access them from other components
    $konvaStore.stage = stage;
    $konvaStore.backgroundLayer = backgroundLayer;
    $konvaStore.mainLayer = mainLayer;
    // We react to changes to the user setting to hide or show the main image
    if (mainLayer) {
      if ($userStore.hideMainImage) {
        mainLayer.hide();
      } else {
        mainLayer.show();
      }
    }
  }
</script>

<svelte:window bind:innerWidth />

<div
  class="canvas_container"
  bind:this={canvasContainer}
  style="transform: scale({canvasContainerScalingRatio})"
>
  {#if $userStore.image.loaded}
    <Stage
      bind:handle={stage}
      config={{
        width: canvasContainer.clientWidth,
        height: canvasContainer.clientHeight,
      }}
      on:wheel={(event) => {
        if (!$konvaStore.backgroundImage) return;
        handleWheel(
          event.detail,
          $konvaStore.backgroundImage,
          $konvaStore.backgroundLayer
        );
      }}
    >
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
  }
</style>
