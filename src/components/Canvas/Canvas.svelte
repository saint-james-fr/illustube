<script lang="ts">
  import { userStore } from "stores";
  import BackgroundImage from "components/BackgroundImage/BackgroundImage.svelte";
  import { Stage, Layer } from "svelte-konva";
  let canvasContainer: HTMLDivElement;
  let canvasContainerScalingRatio: number;
  let innerWidth: number;

  $: {
    canvasContainerScalingRatio = Math.min(innerWidth / 1280, 1);
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
      config={{
        width: canvasContainer.clientWidth,
        height: canvasContainer.clientHeight,
      }}
    >
      <Layer>
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
