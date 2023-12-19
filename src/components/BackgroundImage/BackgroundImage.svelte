<script lang="ts">
  import { Image as KonvaImage } from "svelte-konva";
  import { centerImage } from "lib/media";
  import { userStore, konvaStore } from "stores";
  import { handleDragMove } from "lib/move";
  import type Konva from "konva";

  export let canvasContainer: HTMLDivElement;

  let backgroundImage: Konva.Image;
  $: {
    $konvaStore.bgImage = backgroundImage;
  }
</script>

<KonvaImage
  bind:handle={backgroundImage}
  on:dragmove={(event) => {
    handleDragMove(event.detail, backgroundImage, $konvaStore.bgLayer);
  }}
  config={{
    image: $userStore.image.element,
    width: $userStore.image.width,
    height: $userStore.image.height,
    x: centerImage(
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      $userStore.image.width,
      $userStore.image.height
    ).x,
    y: centerImage(
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      $userStore.image.width,
      $userStore.image.height
    ).y,
    draggable: true,
    name: "backgroundImage",
  }}
/>
