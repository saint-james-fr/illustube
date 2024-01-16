<script lang="ts">
  import { konvaStore, appStore } from "stores";
  import downloadIcon from "assets/icons/download.png";
  import { exportImage } from "lib/download";

  const handleDownload = async () => {
    if (!$konvaStore.bgImage || !$konvaStore.bgImage) {
      return;
    }

    //
    exportImage($konvaStore.stage, $konvaStore.bgImage, $appStore.pixelRatio);
  };
</script>

<img
  src={downloadIcon}
  alt="download"
  id="downloadIcon"
  on:click={handleDownload}
  class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>

<style lang="scss">
  #downloadIcon {
    margin-top: 2rem;
  }
</style>
