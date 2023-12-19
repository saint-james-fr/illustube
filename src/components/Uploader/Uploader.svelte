<script lang="ts">
  import { appStore, routeStore, userStore } from "stores";
  import { validateSize, validateType } from "lib/file";
  import { createImageFromFile, cropImage, validateRatio } from "lib/media";

  let file: File;
  const nextRoute = "modification";

  $: console.log($userStore.image);

  const handleFileChange = async (event: Event) => {
    // First we empty actual data from store
    userStore.update((store) => {
      store.croppedImage = null;
      store.image.reset();
      return store;
    });
    const input = event.target as HTMLInputElement;
    if (input.files) {
      file = input.files[0];
      // we validate the file
      try {
        validateType(file);
        validateSize(file);
        // we create an image from the file
        const createdImage = await createImageFromFile(file);
        const { width, height } = createdImage;
        const ratio = width / height;
        // we update the store
        userStore.update((store) => {
          console.log("updating");
          store.image?.initialize(createdImage, file);
          return store;
        });

        if ($appStore.imageShouldBeSquare) {
          console.log("cropping");
          // If we need to crop, we crop then assign the cropped image to the store for later use
          const croppedImageUrl = await cropImage(createdImage);
          const croppedImage = new Image();
          croppedImage.onload = () => {
            $userStore.croppedImage = croppedImage;
          };

          croppedImage.src = croppedImageUrl;
        }
        // finaly we update the route
        $routeStore.currentRoute = nextRoute;
      } catch (error) {
        console.error(error);
      }
    }
  };
</script>

<div class="uploader_container">
  <form>
    <label for="imageUpload">Upload an image:</label>
    <input
      type="file"
      id="imageUpload"
      accept="image/*"
      on:change={handleFileChange}
    />
  </form>
</div>

<style lang="scss">
  .uploader_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
