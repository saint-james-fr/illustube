import { konvaStore, appStore, filterSettingStore } from "stores";
import { get } from "svelte/store";
import { filterSettingsAutomatic } from "lib/settings";
import Konva from "konva";

type FilterFunction = (typeof Konva.Filters)[keyof typeof Konva.Filters];

const manageFiltersArray = (filterToApply: FilterFunction) => {
  const oldFilters = get(konvaStore).backgroundImage.filters();
  // there is no filter yet
  if (!oldFilters) {
    konvaStore.update((store) => {
      store.backgroundImage.filters([filterToApply]);
      return store;
    });
  } else {
    if (!oldFilters.includes(filterToApply)) {
      konvaStore.update((store) => {
        const newFilters = [...oldFilters, filterToApply];
        store.backgroundImage.filters(newFilters);
        return store;
      });
    }
  }
};

const cache = (img: any, layer: Konva.Layer) => {
  img.cache();
  layer.batchDraw();
};

const applyFilter = (
  filterMethod: (value: number) => void,
  filterValue: number
) => {
  konvaStore.update((store) => {
    filterMethod.call(store.backgroundImage, filterValue);
    return store;
  });
};

export const handleFilterchange = (filterToApply: FilterFunction) => {
  if (!get(konvaStore).backgroundImage) return;
  manageFiltersArray(filterToApply);
  switch (filterToApply) {
    case Konva.Filters.Blur:
      applyFilter(
        get(konvaStore).backgroundImage.blurRadius,
        get(filterSettingStore).blurValue
      );
      break;
    case Konva.Filters.Brighten:
      applyFilter(
        get(konvaStore).backgroundImage.brightness,
        get(filterSettingStore).brightnessValue
      );
      break;
    case Konva.Filters.Contrast:
      applyFilter(
        get(konvaStore).backgroundImage.contrast,
        get(filterSettingStore).contrastValue
      );
      break;
    case Konva.Filters.HSL:
      applyFilter(
        get(konvaStore).backgroundImage.hue,
        get(filterSettingStore).hueRotateValue
      );
      break;
    case Konva.Filters.Noise:
      applyFilter(
        get(konvaStore).backgroundImage.noise,
        get(filterSettingStore).noiseValue
      );
      break;
    case Konva.Filters.Pixelate:
      applyFilter(
        get(konvaStore).backgroundImage.pixelSize,
        get(filterSettingStore).pixelateValue
      );
      break;
    default:
      break;
  }
  let backgroundImage = get(konvaStore).backgroundImage;
  let backgroundLayer = get(konvaStore).backgroundLayer;
  cache(backgroundImage, backgroundLayer);
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
    applyFilter(get(konvaStore).backgroundImage.blurRadius, blurValue);
  }

  if (brightnessValue) {
    manageFiltersArray(Konva.Filters.Brighten);
    applyFilter(get(konvaStore).backgroundImage.brightness, brightnessValue);
  }

  if (contrastValue) {
    manageFiltersArray(Konva.Filters.Contrast);
    applyFilter(get(konvaStore).backgroundImage.contrast, contrastValue);
  }

  if (hueRotateValue) {
    manageFiltersArray(Konva.Filters.HSL);
    applyFilter(get(konvaStore).backgroundImage.hue, hueRotateValue);
  }

  if (noiseValue) {
    manageFiltersArray(Konva.Filters.Noise);
    applyFilter(get(konvaStore).backgroundImage.noise, noiseValue);
  }

  if (pixelateValue) {
    manageFiltersArray(Konva.Filters.Pixelate);
    applyFilter(get(konvaStore).backgroundImage.pixelSize, pixelateValue);
  }

  if (config.opacityValue) {
    applyFilter(get(konvaStore).backgroundImage.opacity, config.opacityValue);
  }
  let backgroundImage = get(konvaStore).backgroundImage;
  let backgroundLayer = get(konvaStore).backgroundLayer;
  cache(backgroundImage, backgroundLayer);
};

const updateFilterSettingStore = (setting: FilterSetting) => {
  filterSettingStore.update((store) => {
    store = { ...store, ...setting };
    return store;
  });
};

const loadSetting = () => {
  const setting = get(appStore).automaticMode
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
