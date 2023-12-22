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
  import { initFiltersValue } from "lib/settings";

  $: {
    filterRoutine();
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

  export const handleFilterchange = (filterToApply: FilterFunction) => {
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

  export const filterRoutine = () => {
    const setting = loadSetting();
    updateFilterSettingStore(setting);
    applyFiltersFromSettings(setting);
  };

  onMount(() => {
    filterRoutine();
  });
</script>
