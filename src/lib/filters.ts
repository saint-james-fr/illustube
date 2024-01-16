import { konvaStore, appStore, filterSettingStore, userStore } from "stores";
import { get } from "svelte/store";
import { filterSettingsAutomatic, initialFilterSettings } from "lib/default";
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
  // we downscale if the image is too big, otherwise we keep the original size for filtering
  let pixelRatio =
    get(userStore).size > get(appStore).downscaleThreshold ? 0.5 : 1;
  console.log("pixelRatio", pixelRatio);
  img.cache({ pixelRatio });
  layer.batchDraw();
};

const setter = (filterMethod: (value: number) => void, filterValue: number) => {
  konvaStore.update((store) => {
    filterMethod.call(store.backgroundImage, filterValue);
    return store;
  });
};

export const handleFilterchange = (filterToApply: FilterFunction) => {
  if (!get(konvaStore).backgroundImage) return;
  let backgroundImage = get(konvaStore).backgroundImage;
  let backgroundLayer = get(konvaStore).backgroundLayer;
  cache(backgroundImage, backgroundLayer);
  manageFiltersArray(filterToApply);
  switch (filterToApply) {
    case Konva.Filters.Blur:
      setter(
        get(konvaStore).backgroundImage.blurRadius,
        get(filterSettingStore).blurValue
      );
      break;
    case Konva.Filters.Brighten:
      setter(
        get(konvaStore).backgroundImage.brightness,
        get(filterSettingStore).brightnessValue
      );
      break;
    case Konva.Filters.Contrast:
      setter(
        get(konvaStore).backgroundImage.contrast,
        get(filterSettingStore).contrastValue
      );
      break;
    case Konva.Filters.HSL:
      setter(
        get(konvaStore).backgroundImage.hue,
        get(filterSettingStore).hueRotateValue
      );
      break;
    case Konva.Filters.Noise:
      setter(
        get(konvaStore).backgroundImage.noise,
        get(filterSettingStore).noiseValue
      );
      break;
    case Konva.Filters.Pixelate:
      setter(
        get(konvaStore).backgroundImage.pixelSize,
        get(filterSettingStore).pixelateValue
      );
      break;
    default:
      break;
  }
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

  if (blurValue) {
    manageFiltersArray(Konva.Filters.Blur);
    setter(get(konvaStore).backgroundImage.blurRadius, blurValue);
  }

  if (brightnessValue) {
    manageFiltersArray(Konva.Filters.Brighten);
    setter(get(konvaStore).backgroundImage.brightness, brightnessValue);
  }

  if (contrastValue) {
    manageFiltersArray(Konva.Filters.Contrast);
    setter(get(konvaStore).backgroundImage.contrast, contrastValue);
  }

  if (hueRotateValue) {
    manageFiltersArray(Konva.Filters.HSL);
    setter(get(konvaStore).backgroundImage.hue, hueRotateValue);
  }

  if (noiseValue) {
    manageFiltersArray(Konva.Filters.Noise);
    setter(get(konvaStore).backgroundImage.noise, noiseValue);
  }

  if (pixelateValue) {
    manageFiltersArray(Konva.Filters.Pixelate);
    setter(get(konvaStore).backgroundImage.pixelSize, pixelateValue);
  }

  if (config.opacityValue) {
    setter(get(konvaStore).backgroundImage.opacity, config.opacityValue);
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
  console.log("loading setting, automatic?", get(appStore).automaticMode);
  const setting = get(appStore).automaticMode
    ? filterSettingsAutomatic
    : get(filterSettingStore);
  return setting;
};

export const resetFilters = () => {
  filterSettingStore.set(initialFilterSettings);

  // Réinitialisez les filtres de l'image de fond
  konvaStore.update((store) => {
    store.backgroundImage.filters([]);
    return store;
  });
};
export const filterRoutine = () => {
  const setting = loadSetting();
  updateFilterSettingStore(setting);
  applyFiltersFromSettings(setting);
};
