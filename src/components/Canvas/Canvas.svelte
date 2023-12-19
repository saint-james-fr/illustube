<script lang="ts">
  import BackgroundImage from "components/BackgroundImage/BackgroundImage.svelte";
  import { userStore, konvaStore } from "stores";
  import { handleWheel } from "lib/move";
  import { Stage, Layer } from "svelte-konva";
  import type Konva from "konva";

  let canvasContainer: HTMLDivElement;
  let canvasContainerScalingRatio: number;
  let innerWidth: number;
  let stage: Konva.Stage;
  let backgroundLayer: Konva.Layer;

  $: {
    canvasContainerScalingRatio = Math.min(innerWidth / 1280, 1);
    $konvaStore.stage = stage;
    $konvaStore.bgLayer = backgroundLayer;
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
      on:wheel={(event) =>
        handleWheel(event.detail, $konvaStore.bgImage, $konvaStore.bgLayer)}
    >
      <Layer bind:handle={backgroundLayer}>
        <BackgroundImage {canvasContainer} />
      </Layer>
    </Stage>
  {/if}
</div>

<style lang="scss">
  .canvas_container {
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: $black;
    max-width: 1000px;
    transform-origin: center center;
  }
</style>
