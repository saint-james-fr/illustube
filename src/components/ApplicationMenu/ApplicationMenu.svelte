<script lang="ts">
  import Uploader from "components/Uploader/Uploader.svelte";
  import { appStore, konvaStore, routeStore } from "stores";
  import homeIcon from "assets/icons/home.png";
  import downloadIcon from "assets/icons/download.png";
  import resetIcon from "assets/icons/reset.png";
  import { exportImage } from "lib/download";
  import { resetFilters } from "lib/filters";

  const handleHome = () => {
    $routeStore.siteRoute = "home";
  };

  const handleDownload = () => {
    if (!$konvaStore.backgroundImage || !$konvaStore.backgroundImage) {
      return;
    }
    exportImage(
      $konvaStore.stage,
      $konvaStore.backgroundImage,
      $appStore.pixelRatio
    );
  };

  const handleReset = () => {
    if (!$konvaStore.backgroundImage || !$konvaStore.backgroundImage) {
      return;
    }
    resetFilters();
  };
</script>

<div class="application_menu">
  <div class="uploader_container">
    <Uploader />
  </div>
  <img
    src={resetIcon}
    alt="reset"
    id="resetIcon"
    on:click={handleReset}
    class:gray={!$konvaStore.backgroundImage || !$konvaStore.backgroundImage}
  />
  <img
    src={downloadIcon}
    alt="download"
    id="downloadIcon"
    on:click={handleDownload}
    class:gray={!$konvaStore.backgroundImage || !$konvaStore.backgroundImage}
  />
  <img src={homeIcon} alt="home" id="homeIcon" on:click={handleHome} />
</div>

<style lang="scss">
  .application_menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $secondary;
    height: 100%;
    width: 100%;
    gap: 1.3rem;
    border-inline: 1px solid var(--primary);
  }

  img,
  .uploader_container {
    height: 36px;
    width: 36px;
    cursor: pointer;
    filter: invert(100%);
  }

  .gray {
    filter: invert(100%) brightness(40%);
  }
</style>
