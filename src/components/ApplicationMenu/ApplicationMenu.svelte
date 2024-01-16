<script lang="ts">
  import Uploader from "components/Uploader/Uploader.svelte";
  import { appStore, konvaStore, routeStore, filterSettingStore } from "stores";
  import homeIcon from "assets/icons/home.png";
  import downloadIcon from "assets/icons/download.png";
  import resetIcon from "assets/icons/reset.png";
  import { exportImage } from "lib/download";
  import { filterRoutine, resetFilters } from "lib/filters";

  const handleHome = () => {
    $routeStore.siteRoute = "home";
  };

  const handleDownload = async () => {
    if (!$konvaStore.backgroundImage || !$konvaStore.backgroundImage) {
      return;
    }

    //
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
  <img src={homeIcon} alt="home" id="homeIcon" on:click={handleHome} />
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
</div>

<style lang="scss">
  .application_menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $background-secondary;
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

  #homeIcon {
    margin-bottom: 2rem;
  }
</style>
