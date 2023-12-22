import {
  konvaStore,
  appStore,
  filterSettingsAutomatic,
  filterSettingStore,
} from "stores";
import { get } from "svelte/store";

import Konva from "konva";



// Type union of all filter functions
type FilterFunction = (typeof Konva.Filters)[keyof typeof Konva.Filters];

const manageFiltersArray = (filterToApply: FilterFunction) => {
  // there is no filter yet
  let filters = get(konvaStore)?.backgroundImage.filters();
  if 
  if (filters.length === 0) {
    konvaStore.update((store) => {
      store.backgroundImage.filters([filterToApply]);
      return store;
    });
  } else {
    // there is already a filter
    // we check if the filter we want to apply is already applied
    // if it is, we return
    // if it is not, we add it to the array
    (() => {
      const oldFilters = get(konvaStore)?.backgroundImage.filters();
      if (oldFilters.includes(filterToApply)) return;
      const newFilters = [...oldFilters, filterToApply];
      konvaStore.update((store) => {
        store.backgroundImage.filters(newFilters);
        return store;
      });
    })();
  }
};

const cache = (img: any, layer: Konva.Layer) => {
  img.cache();
  layer.batchDraw();
};

export const handleFilterchange = (filterToApply: FilterFunction) => {
  const k_store = get(konvaStore);
  if (!get(konvaStore).backgroundImage) return;
  manageFiltersArray(filterToApply);
  const f_store = get(filterSettingStore);
  switch (filterToApply) {
    case Konva.Filters.Blur:
      k_store.backgroundImage.blurRadius(f_store.blurValue);
      break;
    case Konva.Filters.Brighten:
      k_store.backgroundImage.brightness(f_store.brightnessValue);
      break;
    case Konva.Filters.Contrast:
      k_store.backgroundImage.contrast(f_store.contrastValue);
      break;
    case Konva.Filters.HSL:
      k_store.backgroundImage.hue(f_store.hueRotateValue);
      break;
    case Konva.Filters.Noise:
      k_store.backgroundImage.noise(f_store.noiseValue);
      break;
    case Konva.Filters.Pixelate:
      k_store.backgroundImage.pixelSize(f_store.pixelateValue);
      break;
    default:
      break;
  }
  cache(k_store.backgroundImage, k_store.backgroundLayer);
  k_store.backgroundLayer.batchDraw();
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

  const k_store = get(konvaStore);
  if (!k_store.backgroundImage) return;

  console.log("applying");

  if (blurValue) {
    manageFiltersArray(Konva.Filters.Blur);
    k_store.backgroundImage.blurRadius(blurValue);
  }

  if (brightnessValue) {
    manageFiltersArray(Konva.Filters.Brighten);
    k_store.backgroundImage.brightness(brightnessValue);
  }

  if (contrastValue) {
    manageFiltersArray(Konva.Filters.Contrast);
    k_store.backgroundImage.contrast(contrastValue);
  }

  if (hueRotateValue) {
    manageFiltersArray(Konva.Filters.HSL);
    k_store.backgroundImage.hue(hueRotateValue);
  }

  if (noiseValue) {
    manageFiltersArray(Konva.Filters.Noise);
    k_store.backgroundImage.noise(noiseValue);
  }

  if (pixelateValue) {
    manageFiltersArray(Konva.Filters.Pixelate);
    k_store.backgroundImage.pixelSize(pixelateValue);
  }

  if (config.opacityValue) {
    k_store.backgroundImage.opacity(opacityValue);
  }
  k_store.backgroundImage.cache();
  k_store.backgroundLayer.batchDraw();
};

const updateFilterSettingStore = (setting: FilterSetting) => {
  filterSettingStore.update((store) => {
    store = setting;
    return store;
  });
};

const loadSetting = () => {
  const setting = get(appStore)?.automaticMode
    ? filterSettingsAutomatic
    : get(filterSettingStore);
  console.log(setting);
  return setting;
};

export const filterRoutine = () => {
  const setting = loadSetting();
  updateFilterSettingStore(setting);
  applyFiltersFromSettings(setting);
};
