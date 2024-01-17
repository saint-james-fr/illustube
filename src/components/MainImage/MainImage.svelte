<script lang="ts">
  import { konvaStore, appStore, imageStore } from "stores";
  import { Image as KonvaImage, Transformer } from "svelte-konva";
  import { initialTransformerSettings } from "lib/default";
  import { centerImage, findScaleRatio } from "lib/media";
  import { scaleImage } from "lib/konva/move";
  import type Konva from "konva";
  import { onMount } from "svelte";

  export let canvasContainer: HTMLDivElement;
  let konvaImage: Konva.Image;
  let transformer: Konva.Transformer;

  let imageElement =
    $appStore.mainImageShouldBeSquare && $imageStore.main.cropped
      ? $imageStore.main.cropped
      : $imageStore.main.element;

      // TODO : refactor magic number
  let targetWidth = canvasContainer.clientWidth / 2.3;
  let targetHeight = targetWidth;
  let scaleRatio;

  $: $konvaStore.mainImage = konvaImage;

  onMount(() => {
    // Centering the image on mount and giving it  - this is totaly optional and can be removed
    scaleRatio = findScaleRatio($imageStore.main.width, targetWidth);
    scaleImage(konvaImage, scaleRatio);
    // Attaching transformers on mount
    transformer.nodes([konvaImage]);
  });
</script>

<Transformer config={initialTransformerSettings} bind:handle={transformer} />

<KonvaImage
  config={{
    image: imageElement,
    width: $imageStore.main.width,
    height: $imageStore.main.width,
    x: centerImage(
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      targetWidth,
      targetHeight
    ).x,
    y: centerImage(
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      targetWidth,
      targetHeight
    ).y,
    name: "main",
  }}
  bind:handle={konvaImage}
/>
