<script lang="ts">
  import { konvaStore, appStore, userStore } from "stores";
  import { exportImage } from "lib/download";

  const handleDownload = async () => {
    if (!$konvaStore.bgImage || !$konvaStore.bgImage) {
      return;
    }
    exportImage($konvaStore.stage, $konvaStore.bgImage, $appStore.pixelRatio);
  };
</script>

{#if $userStore.automaticMode}
  <p>
    You're in <span class="primary">automatic</span> mode. Enter manual mode to access
    various settings.
  </p>
{/if}
<p>When hovering hover the background, use mouse scroll to zoom in and out.</p>
<p>
  When you're done, click <span
    class="primary download"
    on:click={handleDownload}>here</span
  > or on the download icon.
</p>

<style lang="scss">
  p {
    font-size: 0.9rem;
    line-height: 0.8rem;
  }

  .download {
    cursor: pointer;
  }
</style>
