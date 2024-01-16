<script lang="ts">
  import { konvaStore, imageStore } from "stores";
  import backgroundIcon from "assets/icons/background.png";
  import { upload } from "lib/upload";
  import {
    resetBgImageStore,
    resetFilterSettingStore,
  } from "lib/storesFunctions";
  import { initializeImageInStore } from "lib/storesFunctions";

  const handleBackgroundChange = async (e: Event) => {
    if (!$konvaStore.bgImage || !$konvaStore.bgImage) {
      return;
    }
    resetFilterSettingStore();
    resetBgImageStore();
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      const image = await upload(file);
      if (image) {
        initializeImageInStore(image, file, "bg");
        console.log($imageStore.bg);
      }
    }
  };
</script>

<form>
  <label for="backgroundUpload"
    ><img src={backgroundIcon} alt="background icon" /></label
  >
  <input
    type="file"
    id="backgroundUpload"
    accept="image/*"
    on:change={handleBackgroundChange}
  />
</form>

<style lang="scss">
  form {
    width: 100%;
  }
  #backgroundUpload {
    display: none;
  }
  label {
    cursor: pointer;
    width: 100%;
  }
</style>
