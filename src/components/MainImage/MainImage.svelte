<script lang="ts">
  import { userStore, konvaStore, appStore, transformerStore } from "stores";
  import { Image as KonvaImage, Transformer } from "svelte-konva";
  import { centerImage } from "lib/media";
  import type Konva from "konva";
  import { initialTransformerSettings } from "lib/default";
  // import MainImageTransformers from "components/MainImageTransformers/MainImageTransformers.svelte";

  export let canvasContainer: HTMLDivElement;
  let mainImage: Konva.Image;
  let image: HTMLImageElement;
  let width: number;
  let height: number;
  let targetWidth: number;
  let targetHeight: number;
  let x = 0;
  let y = 0;
  let scaleRatio;

  let transformer: Konva.Transformer;

  // We should scale the image to fit the canvas so we maintain the aspect ratio
  // and also original quality of the image
  // and we only scale
  const findScaleRatio = (imageWidth: number, targetWidth: number) => {
    const ratio = targetWidth / imageWidth;
    return ratio;
  };

  $: {
    // Assign proper Image Element to the image variable
    image =
      $appStore.imageShouldBeSquare && $userStore.croppedImage
        ? $userStore.croppedImage
        : $userStore.image.element;
    if (image) {
      // Get the image dimensions
      width = image.width;
      height = image.height;
      // Fix target Dimensions (should be 1/3 of the canvas here)
      targetWidth = canvasContainer.clientWidth / 3;
      targetHeight = targetWidth;
      // Centering the image
      x = centerImage(
        canvasContainer.clientWidth,
        canvasContainer.clientHeight,
        targetWidth,
        targetHeight
      ).x;
      y = centerImage(
        canvasContainer.clientWidth,
        canvasContainer.clientHeight,
        targetWidth,
        targetHeight
      ).y;
    }
    if (mainImage) {
      // Scale the image
      scaleRatio = findScaleRatio(width, targetWidth);
      mainImage.scaleX(scaleRatio);
      mainImage.scaleY(scaleRatio);
      $konvaStore.mainImage = mainImage;
      transformer.nodes([mainImage]);
    }
  }
</script>

<Transformer config={initialTransformerSettings} bind:handle={transformer} />

<KonvaImage config={{ image, width, height, x, y }} bind:handle={mainImage} />
