<script lang="ts">
  import { settingsStore } from "stores";
  import { exportImage } from "lib/io";
  import type { Filter } from "konva/lib/Node";

  import Konva from "konva";
  import { onMount } from "svelte";

  export let stage: Konva.Stage;
  export let img: Konva.Image;

  const imageSettingsModel = {
    minBlurValue: 0,
    maxBlurValue: 25,
    minBrightnessValue: -1,
    maxBrightnessValue: 1,
    minContrastValue: -70,
    maxContrastValue: 70,
    minHueRotateValue: -180,
    maxHueRotateValue: 180,
    minOpacityValue: 0,
    maxOpacityValue: 1,
    minNoiseValue: 0,
    maxNoiseValue: 0.3,
    minKaleidoscopeValue: 0,
    maxKaleidoscopeValue: 20,
    minPixelateValue: 1,
    maxPixelateValue: 60,
  };

  const {
    minBlurValue,
    maxBlurValue,
    minBrightnessValue,
    maxBrightnessValue,
    minContrastValue,
    maxContrastValue,
    minHueRotateValue,
    maxHueRotateValue,
    minNoiseValue,
    maxNoiseValue,
    minOpacityValue,
    maxOpacityValue,
    minKaleidoscopeValue,
    maxKaleidoscopeValue,
    minPixelateValue,
    maxPixelateValue,
  } = imageSettingsModel;

  const applyFilter = (node: Konva.Node, filter: Filter, value: any) => {
    if (!node) return;
    node.cache();
    // check if filter already applied in node.filters() else add it
    const filters = node.filters() || [];
    const index = filters.indexOf(filter);
    if (index === -1) {
      filters.push(filter);
    } else {
      filters[index] = filter;
    }
    switch (filter) {
      case Konva.Filters.Blur:
        node.blurRadius(value);
        break;
      case Konva.Filters.Brighten:
        node.brightness(value);
        break;
      case Konva.Filters.Contrast:
        node.contrast(value);
        break;
      case Konva.Filters.HSL:
        node.hue(value);
        break;
      case Konva.Filters.Noise:
        node.noise(value);
        break;
      case Konva.Filters.Pixelate:
        node.pixelSize(value);
        break;
      default:
        break;
    }

    node.getLayer()?.batchDraw();
  };

  $: {
    if (img) {
      applyFilter(
        img,
        Konva.Filters.Blur,
        $settingsStore.imageSettings.blurValue
      );
      applyFilter(
        img,
        Konva.Filters.Brighten,
        $settingsStore.imageSettings.brightnessValue
      );
      applyFilter(
        img,
        Konva.Filters.Contrast,
        $settingsStore.imageSettings.contrastValue
      );
      applyFilter(
        img,
        Konva.Filters.HSL,
        $settingsStore.imageSettings.hueRotateValue
      );
      applyFilter(
        img,
        Konva.Filters.Noise,
        $settingsStore.imageSettings.noiseValue
      );
      applyFilter(
        img,
        Konva.Filters.Pixelate,
        $settingsStore.imageSettings.pixelateValue
      );
      img.opacity($settingsStore.imageSettings.opacityValue);
    }
  }

  const handleDoubleClick = (key: keyof ImageSettings) => {
    // console.log("double click", initialImageSettings2);
    // const initialValue = initialImageSettings2[
    //   key
    // ] as number | boolean;
    // $settingsStore.imageSettings[key] = initialValue;
  };

  onMount(() => {
    // document
    //   .querySelectorAll(".settings input[type=range]")
    //   .forEach((el: HTMLInputElement) => {
    //     const key = el.id as keyof ImageSettings;
    //     if (Number(el.value) == $settingsStore.imageSettings[key]) return;

    //     el.addEventListener("dblclick", (e) => {
    //       handleDoubleClick(key);
    //     });
    //   });
  });
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
      <label for="invertValue">Invert</label>
      <input
        type="checkbox"
        id="invertValue"
        bind:checked={$settingsStore.imageSettings.invertValue}
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
    <div class="line">
      <label for="kaleidoscopeValue">Kaleidoscope</label>
      <input
        type="range"
        id="kaleidoscopeValue"
        min={minKaleidoscopeValue}
        max={maxKaleidoscopeValue}
        step="0.01"
        bind:value={$settingsStore.imageSettings.kaleidoscopeValue}
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
