<script lang="ts">
  import { Image as KonvaImage } from "svelte-konva";
  import { centerImage } from "lib/media";
  import { userStore } from "stores";

  export let canvasContainer: HTMLDivElement;
</script>

<KonvaImage
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
