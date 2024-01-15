<script lang="ts">
  import { upload } from "lib/upload";

  const handleUpload = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) upload(files);
  };
</script>

<form>
  <label for="imageUpload" role="button">UPLOAD</label>
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
