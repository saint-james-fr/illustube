<script lang="ts">
  import { upload } from "lib/upload";
  import uploadIcon from "assets/icons/upload.png";
  import { userStore, appStore } from "stores";

  const handleUpload = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      let options = {
        automaticMode: $userStore.automaticMode,
        squareImage: $appStore.mainImageShouldBeSquare,
      };
      upload(files, options);
    }
  };
</script>

<form>
  <label for="imageUpload"><img src={uploadIcon} alt="upload icon" /></label>
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
