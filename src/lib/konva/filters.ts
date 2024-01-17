import {
  konvaStore,
  imageStore,
  appStore,
  filterSettingStore,
  userStore,
} from "stores";
import { get } from "svelte/store";
import { filterSettingsAutomatic } from "lib/default";
import Konva from "konva";

type FilterFunction = (typeof Konva.Filters)[keyof typeof Konva.Filters];

const manageFiltersArray = (
  konvaElement: Konva.Image | Konva.Layer,
  filterToApply: FilterFunction
) => {
  const oldFilters = konvaElement.filters();
  // there is no filter yet
  if (!oldFilters) {
    konvaStore.update((store) => {
      store.bgImage.filters([filterToApply]);
      return store;
    });
  } else {
    if (!oldFilters.includes(filterToApply)) {
      konvaStore.update((store) => {
        const newFilters = [...oldFilters, filterToApply];
        store.bgImage.filters(newFilters);
        return store;
      });
    }
  }
};

const setter = (filterMethod: (value: number) => void, filterValue: number) => {
  konvaStore.update((store) => {
    filterMethod.call(store.bgImage, filterValue);
    return store;
  });
};

export const handleFilterchange = (
  image: Konva.Image,
  filterToApply: FilterFunction
) => {
  if (!image) return;
  const threshold = get(appStore).downscaleThreshold;
  const size = get(imageStore).main.size;
  let pixelRatio = size > threshold ? 0.5 : 1;
  image.cache({ pixelRatio });

  manageFiltersArray(image, filterToApply);
  
  switch (filterToApply) {
    case Konva.Filters.Blur:
      setter(image.blurRadius, get(filterSettingStore).blurRadius);
      break;
    case Konva.Filters.Brighten:
      setter(image.brightness, get(filterSettingStore).brightnessValue);
      break;
    case Konva.Filters.Contrast:
      setter(image.contrast, get(filterSettingStore).contrastValue);
      break;
    case Konva.Filters.HSL:
      setter(image.hue, get(filterSettingStore).hueRotateValue);
      break;
    case Konva.Filters.Noise:
      setter(image.noise, get(filterSettingStore).noiseValue);
      break;
    case Konva.Filters.Pixelate:
      setter(image.pixelSize, get(filterSettingStore).pixelateValue);
      break;
    default:
      break;
  }
};

const applyFiltersFromSettings = (
  image: Konva.Image,
  config: FilterSetting
) => {
  const {
    blurRadius,
    brightnessValue,
    contrastValue,
    hueRotateValue,
    noiseValue,
    pixelateValue,
    opacityValue,
  } = config;

  const threshold = get(appStore).downscaleThreshold;
  const size = get(imageStore).main.size;
  let pixelRatio = size > threshold ? 0.5 : 1;
  image.cache({ pixelRatio });

  if (blurRadius) {
    manageFiltersArray(image, Konva.Filters.Blur);
    setter(image.blurRadius, blurRadius);
  }

  if (brightnessValue) {
    manageFiltersArray(image, Konva.Filters.Brighten);
    setter(image.brightness, brightnessValue);
  }

  if (contrastValue) {
    manageFiltersArray(image, Konva.Filters.Contrast);
    setter(image.contrast, contrastValue);
  }

  if (hueRotateValue) {
    manageFiltersArray(image, Konva.Filters.HSL);
    setter(image.hue, hueRotateValue);
  }

  if (noiseValue) {
    manageFiltersArray(image, Konva.Filters.Noise);
    setter(image.noise, noiseValue);
  }

  if (pixelateValue) {
    manageFiltersArray(image, Konva.Filters.Pixelate);
    setter(image.pixelSize, pixelateValue);
  }

  if (config.opacityValue) {
    setter(image.opacity, opacityValue);
  }
};

const updateFilterSettingStore = (setting: FilterSetting) => {
  filterSettingStore.update((store) => {
    store = { ...store, ...setting };
    return store;
  });
};

const loadSetting = () => {
  const setting = get(userStore).automaticMode
    ? filterSettingsAutomatic
    : get(filterSettingStore);
  return setting;
};

export const emptyFilters = () => {
  konvaStore.update((store) => {
    store.bgImage.filters([]);
    return store;
  });
};

export const filterRoutine = (image: Konva.Image, setting?: FilterSetting) => {
  if (!setting) setting = loadSetting();
  updateFilterSettingStore(setting);
  applyFiltersFromSettings(image, setting);
};
