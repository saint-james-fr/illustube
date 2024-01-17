<script lang="ts">
  import {
    konvaStore,
    imageStore,
    userStore,
    filterSettingStore,
  } from "stores";
  import backgroundIcon from "assets/icons/background.png";
  import { upload } from "lib/upload";
  import { resetBgImageStore } from "lib/storesFunctions";
  import { initializeImageInStore } from "lib/storesFunctions";
  import { emptyFilters, filterRoutine } from "lib/konva/filters";

  const handleBackgroundChange = async (e: Event) => {
    if (!$konvaStore.bgImage || !$konvaStore.bgImage) {
      return;
    }
    // empty filters
    emptyFilters();
    // reset filters
    filterSettingStore.update((store) => {
      store.reset();
      return store;
    });
    // // empty bgImage
    resetBgImageStore();
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      const image = await upload(file);
      if (image) {
        // this kind of a hack to clear the cache
        initializeImageInStore(image, file, "bg");
        if ($konvaStore.bgImage._cache.has("canvas")) {
          $konvaStore.bgImage._cache.delete("canvas");
          $konvaStore.bgLayer.batchDraw();
        }
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
