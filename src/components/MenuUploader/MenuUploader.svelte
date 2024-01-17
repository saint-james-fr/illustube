<script lang="ts">
  import { upload } from "lib/upload";
  import uploadIcon from "assets/icons/upload.png";
  import {
    resetBgImageStore,
    resetFilterSettingStore,
    resetMainImageStore,
    initializeImageInStore,
  } from "lib/storesFunctions";

  import { tippy } from "svelte-tippy";

  const handleUpload = async (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      resetBgImageStore();
      resetFilterSettingStore();
      resetMainImageStore();
      const file = files[0];
      const image = await upload(file);
      if (image) {
        initializeImageInStore(image, file, "main");
        initializeImageInStore(image, file, "bg");
      }
    }
  };
</script>

<form>
  <span
    use:tippy={{
      content: "UPLOAD",
      placement: "right",
      animation: "perspective-subtle",
    }}
  >
    <label for="imageUpload"><img src={uploadIcon} alt="upload icon" /></label>
  </span>
  <input
    type="file"
    id="imageUpload"
    accept="image/*"
    on:change={handleUpload}
  />
</form>

<style lang="scss">
  form {
    width: 100%;
  }
  #imageUpload {
    display: none;
  }
  label {
    cursor: pointer;
    width: 100%;
  }
</style>
