<script lang="ts">
  import { Image as KonvaImage } from "svelte-konva";
  import { centerImage } from "lib/media";
  import { imageStore, konvaStore, userStore } from "stores";
  import { handleDragMove } from "lib/konva/move";
  import Konva from "konva";
  import { onMount, tick } from "svelte";
  import { filterRoutine } from "lib/konva/filters";

  // TODO : add more filters
  export let canvasContainer: HTMLDivElement;

  $: $konvaStore.bgImage = konvaImage;

  let konvaImage: Konva.Image;

  onMount(async () => {
    if ($userStore.automaticMode) {
      await tick();
      filterRoutine();
    }
  });
</script>

<KonvaImage
  bind:handle={konvaImage}
  on:dragmove={(event) => {
    document.body.style.cursor = "grabbing";
    handleDragMove(event.detail, konvaImage, $konvaStore.bgLayer);
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
    image: $imageStore.bg.element,
    width: $imageStore.bg.width,
    height: $imageStore.bg.height,
    x: centerImage(
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      $imageStore.bg.width,
      $imageStore.bg.height
    ).x,
    y: centerImage(
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      $imageStore.bg.width,
      $imageStore.bg.height
    ).y,
    draggable: true,
    name: "bg",
  }}
/>
