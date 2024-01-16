<script lang="ts">
  import Uploader from "components/Uploader/Uploader.svelte";
  import { appStore, konvaStore, routeStore, userStore } from "stores";
  import homeIcon from "assets/icons/home.png";
  import downloadIcon from "assets/icons/download.png";
  import resetIcon from "assets/icons/reset.png";
  import settingsIcon from "assets/icons/settings.png";
  import baguetteIcon from "assets/icons/baguette.png";
  import backgroundIcon from "assets/icons/background.png";
  import { exportImage } from "lib/download";
  import { resetFilters } from "lib/filters";

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

  const handleAutomaticMode = () => {
    if (!$konvaStore.backgroundImage || !$konvaStore.backgroundImage) {
      return;
    }
    $appStore.automaticMode = true;
  };

  const handleManualMode = () => {
    if (!$konvaStore.backgroundImage || !$konvaStore.backgroundImage) {
      return;
    }
    $appStore.automaticMode = false;
  };

  const handleBackgroundChange = () => {
    if (!$konvaStore.backgroundImage || !$konvaStore.backgroundImage) {
      return;
    }

    // TODO : impelment this function
  };
</script>

<div class="application_menu">
  <img src={homeIcon} alt="home" ta id="homeIcon" on:click={handleHome} />
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
    src={baguetteIcon}
    alt="reset"
    id="baguetteIcon"
    on:click={handleAutomaticMode}
    class:gray={!$konvaStore.backgroundImage || !$konvaStore.backgroundImage}
  />
  <img
    src={backgroundIcon}
    alt="reset"
    id="backgroundIcon"
    on:click={handleBackgroundChange}
    class:gray={!$konvaStore.backgroundImage || !$konvaStore.backgroundImage}
  />
  <img
    src={settingsIcon}
    alt="reset"
    id="settingsIcon"
    on:click={handleManualMode}
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

  $icon_width: 30px;

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
    height:$icon_width;
    width:$icon_width;
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
