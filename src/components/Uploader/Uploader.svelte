<script lang="ts">
  import { appStore, routeStore, userStore } from "stores";
  import { Stage, Layer, Image as KonvaImage } from "svelte-konva";
  import { validateSize, validateType } from "lib/file";
  import {
    createImageFromFile,
    cropImage,
    validateRatio,
  } from "lib/media";

  let file: File;
  let img: HTMLImageElement;

  $: console.log($userStore.image);

  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      file = input.files[0];
      validateType(file);
      validateSize(file);
      console.log($userStore.image);
      try {
        const createdImage = await createImageFromFile(file);
        const {width, height }= createdImage;
        const ratio = width / height
        img = createdImage;

        if (!validateRatio(ratio) && $appStore.imageShouldBeSquare) {
          const croppedImage = await cropImage(createdImage);
          img = new Image();
          img.onload = () => {
            userStore.update((store) => {
              store.image?.initialize(img, file);
              return store;
            });
          };
          img.src = croppedImage;
        } else {
          img = createdImage;
          userStore.update((store) => {
            store.image?.initialize(img, file);
            return store;
          });
        }
        // finaly change route
        $routeStore.currentRoute = "metadata";
      } catch (error) {
        console.error(error);
      }
    }
  };
</script>

<form>
  <label for="imageUpload">Upload an image:</label>
  <input
    type="file"
    id="imageUpload"
    accept="image/*"
    on:change={handleFileChange}
  />
</form>


