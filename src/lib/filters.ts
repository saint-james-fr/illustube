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
    (() => {
      if (oldFilters.includes(filterToApply)) return;
      konvaStore.update((store) => {
        const newFilters = [...oldFilters, filterToApply];
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
  if (!get(konvaStore).backgroundImage) return;
  manageFiltersArray(filterToApply);
  switch (filterToApply) {
    case Konva.Filters.Blur:
      konvaStore.update((store) => {
        store.backgroundImage.blurRadius(get(filterSettingStore).blurValue);
        return store;
      });
      break;
    case Konva.Filters.Brighten:
      konvaStore.update((store) => {
        store.backgroundImage.brightness(
          get(filterSettingStore).brightnessValue
        );
        return store;
      });
      break;
    case Konva.Filters.Contrast:
      konvaStore.update((store) => {
        store.backgroundImage.contrast(get(filterSettingStore).contrastValue);
        return store;
      });
      break;
    case Konva.Filters.HSL:
      konvaStore.update((store) => {
        store.backgroundImage.hue(get(filterSettingStore).hueRotateValue);
        return store;
      });
      break;
    case Konva.Filters.Noise:
      konvaStore.update((store) => {
        store.backgroundImage.noise(get(filterSettingStore).noiseValue);
        return store;
      });
      break;
    case Konva.Filters.Pixelate:
      konvaStore.update((store) => {
        store.backgroundImage.pixelSize(get(filterSettingStore).pixelateValue);
        return store;
      });
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
    konvaStore.update((store) => {
      store.backgroundImage.blurRadius(blurValue);
      return store;
    });
  }

  if (brightnessValue) {
    manageFiltersArray(Konva.Filters.Brighten);
    konvaStore.update((store) => {
      store.backgroundImage.brightness(brightnessValue);
      return store;
    });
  }

  if (contrastValue) {
    manageFiltersArray(Konva.Filters.Contrast);
    konvaStore.update((store) => {
      store.backgroundImage.contrast(contrastValue);
      return store;
    });
  }

  if (hueRotateValue) {
    manageFiltersArray(Konva.Filters.HSL);
    konvaStore.update((store) => {
      store.backgroundImage.hue(hueRotateValue);
      return store;
    });
  }

  if (noiseValue) {
    manageFiltersArray(Konva.Filters.Noise);
    konvaStore.update((store) => {
      store.backgroundImage.noise(noiseValue);
      return store;
    });
  }

  if (pixelateValue) {
    manageFiltersArray(Konva.Filters.Pixelate);
    konvaStore.update((store) => {
      store.backgroundImage.pixelSize(pixelateValue);
      return store;
    });
  }

  if (config.opacityValue) {
    konvaStore.update((store) => {
      store.backgroundImage.opacity(config.opacityValue);
      return store;
    });
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


