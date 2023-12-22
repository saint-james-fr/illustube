<script lang="ts">
  import { upload } from "lib/upload";
</script>

<div class="uploader_container">
  <form>
    <label for="imageUpload">Upload an image:</label>
    <input type="file" id="imageUpload" accept="image/*" on:change={upload} />
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
