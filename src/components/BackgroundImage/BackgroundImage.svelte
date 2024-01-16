<script lang="ts">
  import { Image as KonvaImage } from "svelte-konva";
  import { centerImage } from "lib/media";
  import { userStore, konvaStore, filterSettingStore } from "stores";
  import { handleDragMove } from "lib/konva/move";
  import Konva from "konva";
  import { onMount, tick } from "svelte";

  export let canvasContainer: HTMLDivElement;

  // This is binded to the Konva.Image component
  let backgroundImage: Konva.Image;

  $: {
    if (backgroundImage) $konvaStore.backgroundImage = backgroundImage;
  }

  onMount(async () => {
    await tick();
    backgroundImage.cache();
  });
</script>

<KonvaImage
  bind:handle={backgroundImage}
  on:dragmove={(event) => {
    document.body.style.cursor = "grabbing";
    handleDragMove(event.detail, backgroundImage, $konvaStore.backgroundLayer);
  }}
  on:dragend={() => {
    document.body.style.cursor = "grab";
  }}
  on:mouseenter={() => {
    document.body.style.cursor = "grab";
  }}
  on:mouseleave={() => {
    document.body.style.cursor = "default";
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
