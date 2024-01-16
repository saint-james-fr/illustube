import {
  konvaStore,
  imageStore,
  appStore,
  filterSettingStore,
  userStore,
} from "stores";
import { get } from "svelte/store";
import { filterSettingsAutomatic, initialFilterSettings } from "lib/default";
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

export const handleFilterchange = (filterToApply: FilterFunction) => {
  if (!get(konvaStore).bgImage) return;
  const threshold = get(appStore).downscaleThreshold;
  const size = get(imageStore).main.size;
  let pixelRatio = size > threshold ? 0.5 : 1;
  get(konvaStore).bgImage.cache({ pixelRatio });

  manageFiltersArray(get(konvaStore).bgImage, filterToApply);
  switch (filterToApply) {
    case Konva.Filters.Blur:
      setter(
        get(konvaStore).bgImage.blurRadius,
        get(filterSettingStore).blurRadius
      );
      break;
    case Konva.Filters.Brighten:
      setter(
        get(konvaStore).bgImage.brightness,
        get(filterSettingStore).brightnessValue
      );
      break;
    case Konva.Filters.Contrast:
      setter(
        get(konvaStore).bgImage.contrast,
        get(filterSettingStore).contrastValue
      );
      break;
    case Konva.Filters.HSL:
      setter(
        get(konvaStore).bgImage.hue,
        get(filterSettingStore).hueRotateValue
      );
      break;
    case Konva.Filters.Noise:
      setter(get(konvaStore).bgImage.noise, get(filterSettingStore).noiseValue);
      break;
    case Konva.Filters.Pixelate:
      setter(
        get(konvaStore).bgImage.pixelSize,
        get(filterSettingStore).pixelateValue
      );
      break;
    default:
      break;
  }

};

const applyFiltersFromSettings = (config: FilterSetting) => {
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
  get(konvaStore).bgImage.cache({ pixelRatio });

  if (blurRadius) {
    manageFiltersArray(get(konvaStore).bgImage, Konva.Filters.Blur);
    setter(get(konvaStore).bgImage.blurRadius, blurRadius);
  }

  if (brightnessValue) {
    manageFiltersArray(get(konvaStore).bgImage, Konva.Filters.Brighten);
    setter(get(konvaStore).bgImage.brightness, brightnessValue);
  }

  if (contrastValue) {
    manageFiltersArray(get(konvaStore).bgImage, Konva.Filters.Contrast);
    setter(get(konvaStore).bgImage.contrast, contrastValue);
  }

  if (hueRotateValue) {
    manageFiltersArray(get(konvaStore).bgImage, Konva.Filters.HSL);
    setter(get(konvaStore).bgImage.hue, hueRotateValue);
  }

  if (noiseValue) {
    manageFiltersArray(get(konvaStore).bgImage, Konva.Filters.Noise);
    setter(get(konvaStore).bgImage.noise, noiseValue);
  }

  if (pixelateValue) {
    manageFiltersArray(get(konvaStore).bgImage, Konva.Filters.Pixelate);
    setter(get(konvaStore).bgImage.pixelSize, pixelateValue);
  }

  if (config.opacityValue) {
    setter(get(konvaStore).bgImage.opacity, opacityValue);
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

export const resetFilters = () => {
  filterSettingStore.set(initialFilterSettings);
  konvaStore.update((store) => {
    store.bgImage.filters([]);
    return store;
  });
  get(konvaStore).bgImage.cache();
};

export const filterRoutine = (setting?: FilterSetting) => {
  if (!setting) setting = loadSetting();
  updateFilterSettingStore(setting);
  applyFiltersFromSettings(setting);
};
