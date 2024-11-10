<script lang="ts">
  import { konvaStore, userStore } from "stores";
  import mainImageIcon from "assets/icons/foreground.png";
  import { upload } from "lib/upload";
  import { resetMainImageStore } from "lib/storesFunctions";
  import { initializeImageInStore } from "lib/storesFunctions";
  import { tippy } from "svelte-tippy";

  const handleMainImageChange = async (e: Event) => {
    if (!$konvaStore.mainImage) {
      return;
    }
    // If no file choose return
    if (e && !(e.target as HTMLInputElement).files) {
      return;
    }
    resetMainImageStore();
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      const image = await upload(file);
      if (image) {
        initializeImageInStore(image, file, "main");
      }
    }
  };
</script>

<form>
  <span
    use:tippy={{
      content: "CHANGE MAIN IMAGE",
      placement: "right",
      animation: "perspective-subtle",
    }}
  >
    <label for="mainImageUpload"
      ><img src={mainImageIcon} alt="main image icon" /></label
    >
  </span>
  <input
    type="file"
    id="mainImageUpload"
    accept="image/*"
    on:change={handleMainImageChange}
  />
</form>

<style lang="scss">
  form {
    width: 100%;
  }
  #mainImageUpload {
    display: none;
  }
  label {
    cursor: pointer;
    width: 100%;
  }
</style>
