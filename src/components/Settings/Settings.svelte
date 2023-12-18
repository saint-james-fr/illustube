<script lang="ts">
  import { settingsStore } from "stores";
  import { exportImage } from "lib/io";

  import Konva from "konva";
  import { onMount } from "svelte";

  export let stage: Konva.Stage;
  export let img: Konva.Image;

  const {
    minBlurValue = 0,
    maxBlurValue = 25,
    minBrightnessValue = -1,
    maxBrightnessValue = 1,
    minContrastValue = -70,
    maxContrastValue = 70,
    minHueRotateValue = -180,
    maxHueRotateValue = 180,
    minOpacityValue = 0,
    maxOpacityValue = 1,
    minNoiseValue = 0,
    maxNoiseValue = 0.3,
    minPixelateValue = 1,
    maxPixelateValue = 60,
  } = {};
</script>

<div class="settings">
  <form>
    <div class="line">
      <label for="automaticMode">Automatic</label>
      <input
        type="checkbox"
        id="automaticMode"
        bind:checked={$settingsStore.automaticMode}
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
        bind:value={$settingsStore.imageSettings.blurValue}
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
        bind:value={$settingsStore.imageSettings.brightnessValue}
      />
    </div>

    <div class="line">
      <label for="contrastValue">Contrast</label>
      <input
        type="range"
        id="contrastValue"
        min={minContrastValue}
        max={maxContrastValue}
        bind:value={$settingsStore.imageSettings.contrastValue}
      />
    </div>

    <div class="line">
      <label for="hueRotateValue">Hue Rotate</label>
      <input
        type="range"
        id="hueRotateValue"
        min={minHueRotateValue}
        max={maxHueRotateValue}
        bind:value={$settingsStore.imageSettings.hueRotateValue}
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
        bind:value={$settingsStore.imageSettings.opacityValue}
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
        bind:value={$settingsStore.imageSettings.pixelateValue}
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
        bind:value={$settingsStore.imageSettings.noiseValue}
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
      transition: background 0.15s ease-in-out;
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
