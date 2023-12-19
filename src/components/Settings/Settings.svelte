<script lang="ts">
  import { filterSettingsStore, appStore } from "stores";
  import { exportImage } from "lib/download";
  import { konvaStore } from "stores";

  import Konva from "konva";

  export let stage: Konva.Stage;
  export let img: Konva.Image;

  const {
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
        $konvaStore.backgroundImage.blurRadius($filterSettingsStore.blurValue);
        break;
      case Konva.Filters.Brighten:
        $konvaStore.backgroundImage.brightness($filterSettingsStore.brightnessValue);
        break;
      case Konva.Filters.Contrast:
        $konvaStore.backgroundImage.contrast($filterSettingsStore.contrastValue);
        break;
      case Konva.Filters.HSL:
        $konvaStore.backgroundImage.hue($filterSettingsStore.hueRotateValue);
        break;
      case Konva.Filters.Noise:
        $konvaStore.backgroundImage.noise($filterSettingsStore.noiseValue);
        break;
      case Konva.Filters.Pixelate:
        $konvaStore.backgroundImage.pixelSize($filterSettingsStore.pixelateValue);
        break;
      default:
        break;
    }
    cache($konvaStore.backgroundImage, $konvaStore.backgroundLayer);
    $konvaStore.backgroundLayer.batchDraw();
  };

</script>

<div class="settings">
  <form>
    <div class="line">
      <label for="automaticMode">Automatic</label>
      <input
        type="checkbox"
        id="automaticMode"
        bind:checked={$appStore.automaticMode}
      />
    </div>
    <div class="line">
      <label for="blurValue">Blur</label>
      <input
        type="range"
        id="blurValue"
        min={minBlurValue}
        max={maxBlurValue}
        step="0.3"
        bind:value={$filterSettingsStore.blurValue}
        on:input={() => handleFilterchange(Konva.Filters.Blur)}
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
        bind:value={$filterSettingsStore.brightnessValue}
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
        bind:value={$filterSettingsStore.contrastValue}
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
        bind:value={$filterSettingsStore.hueRotateValue}
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
        bind:value={$filterSettingsStore.opacityValue}
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
        bind:value={$filterSettingsStore.pixelateValue}
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
        bind:value={$filterSettingsStore.noiseValue}
        on:input={() => handleFilterchange(Konva.Filters.Noise)}
      />
    </div>
  </form>
  <button
    on:click={() => {
      exportImage(stage, img);
    }}>Download</button
  >
</div>

<style lang="scss">
  .settings {
    width: 100%;
    height: 100%;
    padding-inline: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: $workzone-settings;

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
