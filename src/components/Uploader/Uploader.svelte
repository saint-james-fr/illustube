<script lang="ts">
  import { upload } from "lib/upload";
</script>

<form>
  <label for="imageUpload" role="button">UPLOAD</label>
  <input type="file" id="imageUpload" accept="image/*" on:change={upload} />
</form>

<style lang="scss">
  #imageUpload {
    display: none;
  }
  label {
    cursor: pointer;
  }
</style>
