<script lang="ts">
  import { exportImage } from "lib/download";
  import {
    appStore,
    filterSettingsManual,
    filterSettingStore,
    konvaStore,
  } from "stores";
  import { onMount } from "svelte";

  import Konva from "konva";
  import { initFiltersValue } from "lib/settings";
  import { handleFilterchange, filterRoutine } from "lib/filters";

  export let stage: Konva.Stage;
  export let img: Konva.Image;

  let pixelRatio: number;

  $: filterRoutine;

  onMount(() => {
    filterRoutine();
  });

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
    <div class="line">
      <label for="backgroundImageCoverAndCenter">Automatic</label>
      <input
        type="checkbox"
        id="backgroundImageCoverAndCenter"
        bind:checked={$appStore.automaticMode}
        on:toggle={() => {
          console.log(
            $appStore.automaticMode,
            $filterSettingStore,
            filterSettingsManual
          );
          console.log("rr");
          filterRoutine();
        }}
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
