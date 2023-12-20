<script lang="ts">
  import { userStore, konvaStore, appStore } from "stores";
  import { Image as KonvaImage } from "svelte-konva";
  import { centerImage } from "lib/media";
  import type Konva from "konva";

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

    // Get the image dimensions
    width = image.width;
    height = image.height;
    // Fix target Dimensions (should be 1/3 of the canvas here)
    targetWidth =
      canvasContainer.clientWidth / (9 / $appStore.mainImageSize);
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
    // Scale the image
    if (mainImage) {
      scaleRatio = findScaleRatio(width, targetWidth);
      mainImage.scaleX(scaleRatio);
      mainImage.scaleY(scaleRatio);
      $konvaStore.mainImage = mainImage;
    }
  }
</script>

<KonvaImage config={{ image, width, height, x, y }} bind:handle={mainImage} />
