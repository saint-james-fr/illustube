import { imageStore, konvaStore, filterSettingStore } from "stores";

export const resetMainImageStore = () => {
  imageStore.update((store) => {
    store.main.reset();
    return store;
  });
};

export const resetBgImageStore = () => {
  imageStore.update((store) => {
    store.bg.reset();
    return store;
  });
};

export const resetKonvaStore = () => {
  konvaStore.update((store) => {
    store.reset();
    return store;
  });
};

export const resetFilterSettingStore = () => {
  filterSettingStore.update((store) => {
    store.reset();
    return store;
  });
};
