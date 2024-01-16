<script lang="ts">
  import { appStore, filterSettingStore, konvaStore, userStore} from "stores";

  import Konva from "konva";
  import { initFiltersValue } from "lib/default";
  import { handleFilterchange } from "lib/filters";

  let pixelRatio: number;

  let {
    minBlurValue,
    maxBlurValue,
    minBrightnessValue,
    maxBrightnessValue,
    minContrastValue,
    maxContrastValue,
    minHueRotateValue,
    maxHueRotateValue,
    minOpacityValue,
    maxOpacityValue,
    minPixelateValue,
    maxPixelateValue,
    minNoiseValue,
    maxNoiseValue,
  } = initFiltersValue;

  $: {
    pixelRatio = $appStore.pixelRatio;
  }
</script>

<div class="settings">
  <form>
    {#if !$userStore.automaticMode}
      <div class="line">
        <label for="blurValue">blur</label>
        <input
          type="range"
          id="blurValue"
          min={minBlurValue}
          max={maxBlurValue}
          step="0.3"
          bind:value={$filterSettingStore.blurValue}
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
      <div class="row">
        <input
          type="checkbox"
          id="hideMainImage"
          bind:checked={$userStore.hideMainImage}
        />
        <label for="hideMainImage">Hide center image</label>
      </div>
    {/if}
  </form>
</div>

<style lang="scss">
  .settings {
    width: 100%;

    form {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    label {
      text-transform: capitalize;
      font-size: 0.9rem;
      letter-spacing: 1px;
      padding-top: 0.3rem;
    }

    .line {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      & > label {
        width: 100%;
      }
    }

    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
    }
  }
</style>
