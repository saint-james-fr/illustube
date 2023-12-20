<script lang="ts">
  import { exportImage } from "lib/download";
  import {
    konvaStore,
    appStore,
    filterSettingsManual,
    filterSettingsAutomatic,
    filterSettingStore,
  } from "stores";

  import Konva from "konva";
  import { onMount } from "svelte";

  export let stage: Konva.Stage;
  export let img: Konva.Image;

  let pixelRatio: number;

  const {
    minMainImageSize = 2.2,
    maxMainImageSize = 4.2,
    minBlurValue = 0,
    maxBlurValue = 100,
    minBrightnessValue = -0.5,
    maxBrightnessValue = 0.5,
    minContrastValue = -20,
    maxContrastValue = 20,
    minHueRotateValue = -180,
    maxHueRotateValue = 180,
    minOpacityValue = 0,
    maxOpacityValue = 1,
    minNoiseValue = 0,
    maxNoiseValue = 0.5,
    minPixelateValue = 1,
    maxPixelateValue = 100,
  } = {};

  $: {
    pixelRatio = $appStore.pixelRatio;
    filterRoutine();
    if ($appStore.mainImageSize) {
      $konvaStore.mainLayer.redraw();
    }
  }

  // Type union of all filter functions
  type FilterFunction = (typeof Konva.Filters)[keyof typeof Konva.Filters];

  const manageFiltersArray = (filterToApply: FilterFunction) => {
    // there is no filter yet
    if (!$konvaStore.backgroundImage.filters()) {
      $konvaStore.backgroundImage.filters([filterToApply]);
    } else {
      (() => {
        const oldFilters = $konvaStore.backgroundImage.filters();
        if (oldFilters.includes(filterToApply)) return;
        const newFilters = [...oldFilters, filterToApply];
        $konvaStore.backgroundImage.filters(newFilters);
      })();
    }
  };

  const cache = (img: any, layer: Konva.Layer) => {
    img.cache();
    layer.batchDraw();
  };

  const handleFilterchange = (filterToApply: FilterFunction) => {
    if (!$konvaStore.backgroundImage) return;
    manageFiltersArray(filterToApply);
    switch (filterToApply) {
      case Konva.Filters.Blur:
        $konvaStore.backgroundImage.blurRadius($filterSettingStore.blurValue);
        break;
      case Konva.Filters.Brighten:
        $konvaStore.backgroundImage.brightness(
          $filterSettingStore.brightnessValue
        );
        break;
      case Konva.Filters.Contrast:
        $konvaStore.backgroundImage.contrast($filterSettingStore.contrastValue);
        break;
      case Konva.Filters.HSL:
        $konvaStore.backgroundImage.hue($filterSettingStore.hueRotateValue);
        break;
      case Konva.Filters.Noise:
        $konvaStore.backgroundImage.noise($filterSettingStore.noiseValue);
        break;
      case Konva.Filters.Pixelate:
        $konvaStore.backgroundImage.pixelSize(
          $filterSettingStore.pixelateValue
        );
        break;
      default:
        break;
    }
    cache($konvaStore.backgroundImage, $konvaStore.backgroundLayer);
    $konvaStore.backgroundLayer.batchDraw();
  };

  const applyFiltersFromSettings = (config: FilterSetting) => {
    const {
      blurValue,
      brightnessValue,
      contrastValue,
      hueRotateValue,
      noiseValue,
      pixelateValue,
      opacityValue,
    } = config;

    console.log("applying");

    if (blurValue) {
      manageFiltersArray(Konva.Filters.Blur);
      $konvaStore.backgroundImage.blurRadius(blurValue);
    }

    if (brightnessValue) {
      manageFiltersArray(Konva.Filters.Brighten);
      $konvaStore.backgroundImage.brightness(brightnessValue);
    }

    if (contrastValue) {
      manageFiltersArray(Konva.Filters.Contrast);
      $konvaStore.backgroundImage.contrast(contrastValue);
    }

    if (hueRotateValue) {
      manageFiltersArray(Konva.Filters.HSL);
      $konvaStore.backgroundImage.hue(hueRotateValue);
    }

    if (noiseValue) {
      manageFiltersArray(Konva.Filters.Noise);
      $konvaStore.backgroundImage.noise(noiseValue);
    }

    if (pixelateValue) {
      manageFiltersArray(Konva.Filters.Pixelate);
      $konvaStore.backgroundImage.pixelSize(pixelateValue);
    }

    if (config.opacityValue) {
      $konvaStore.backgroundImage.opacity(opacityValue);
    }
    $konvaStore.backgroundImage.cache();
    $konvaStore.backgroundLayer.batchDraw();
  };

  const updateFilterSettingStore = (setting: FilterSetting) => {
    $filterSettingStore = { ...setting };
  };

  const loadSetting = () => {
    const setting = $appStore.automaticMode
      ? filterSettingsAutomatic
      : $filterSettingStore;
    console.log(setting);
    return setting;
  };

  const filterRoutine = () => {
    const setting = loadSetting();
    updateFilterSettingStore(setting);
    applyFiltersFromSettings(setting);
  };

  onMount(() => {
    filterRoutine();
  });
</script>

<div class="settings">
  <form>
    <div class="line">
      <label for="backgroundImageCoverAndCenter">Automatic</label>
      <input
        type="checkbox"
        id="backgroundImageCoverAndCenter"
        bind:checked={$appStore.automaticMode}
        on:toggle={() => {
          console.log($appStore.automaticMode, $filterSettingStore, filterSettingsManual)
          console.log("rr")
          filterRoutine();
        }}
      />
    </div>
    <div class="line">
      <label for="mainImageSize">Blur</label>
      <input
        type="range"
        id="mainImageSize"
        min={minMainImageSize}
        max={maxMainImageSize}
        step="0.2"
        bind:value={$appStore.mainImageSize}
      />
    </div>
    {#if !$appStore.automaticMode}
      <div class="line">
        <label for="blurValue">Blur</label>
        <input
          type="range"
          id="blurValue"
          min={minBlurValue}
          max={maxBlurValue}
          step="0.3"
          bind:value={$filterSettingStore.blurValue}
          on:change={() => handleFilterchange(Konva.Filters.Blur)}
        />
      </div>
      <div class="line">
        <label for="brightnessValue">Brightness</label>
        <input
          type="range"
          id="brightnessValue"
          min={minBrightnessValue}
          max={maxBrightnessValue}
          step="0.01"
          bind:value={$filterSettingStore.brightnessValue}
          on:input={() => handleFilterchange(Konva.Filters.Brighten)}
        />
      </div>

      <div class="line">
        <label for="contrastValue">Contrast</label>
        <input
          type="range"
          id="contrastValue"
          min={minContrastValue}
          max={maxContrastValue}
          bind:value={$filterSettingStore.contrastValue}
          on:input={() => handleFilterchange(Konva.Filters.Contrast)}
        />
      </div>

      <div class="line">
        <label for="hueRotateValue">Hue Rotate</label>
        <input
          type="range"
          id="hueRotateValue"
          min={minHueRotateValue}
          max={maxHueRotateValue}
          bind:value={$filterSettingStore.hueRotateValue}
          on:input={() => handleFilterchange(Konva.Filters.HSL)}
        />
      </div>

      <div class="line">
        <label for="opacityValue">Opacity</label>
        <input
          type="range"
          id="opacityValue"
          min={minOpacityValue}
          max={maxOpacityValue}
          step="0.01"
          bind:value={$filterSettingStore.opacityValue}
          on:input={() =>
            $konvaStore.backgroundImage.opacity(
              $filterSettingStore.opacityValue
            )}
        />
      </div>

      <div class="line">
        <label for="pixelateValue">pixelate</label>
        <input
          type="range"
          id="pixelateValue"
          min={minPixelateValue}
          max={maxPixelateValue}
          step="0.5"
          bind:value={$filterSettingStore.pixelateValue}
          on:input={() => handleFilterchange(Konva.Filters.Pixelate)}
        />
      </div>
      <div class="line">
        <label for="noiseValue">Noise</label>
        <input
          type="range"
          id="noiseValue"
          min={minNoiseValue}
          max={maxNoiseValue}
          step="0.01"
          bind:value={$filterSettingStore.noiseValue}
          on:input={() => handleFilterchange(Konva.Filters.Noise)}
        />
      </div>
    {/if}
  </form>
  <button
    on:click={() => {
      exportImage(stage, img, pixelRatio);
    }}>Download</button
  >
</div>

<style lang="scss">
  .settings {
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: $workzone-settings;

    form {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
    }

    input[type="range"] {
      width: 100%;
      height: 20px;
      background-color: $workzone-settings-button;
      border: none;
      -webkit-appearance: none;
      border-radius: 1px;
      outline: none;
      padding: 0;
      cursor: pointer;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 8px;
      height: 20px;
      border: none;
      border-radius: 1px;
      background: $workzone-border;
      cursor: pointer;
    }

    .line {
      font-size: 0.8rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 1rem;

      & > label {
        width: 100%;
      }
    }
  }
</style>
