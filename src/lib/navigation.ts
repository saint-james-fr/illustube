import { upload } from "lib/upload";
import {
  resetBgImageStore,
  resetFilterSettingStore,
  resetMainImageStore,
} from "lib/storesFunctions";
import { initializeImageInStore } from "lib/storesFunctions";
import { routeStore } from "stores";

export const enterApplication = async (e: Event) => {
  try {
    resetBgImageStore();
    resetMainImageStore();
    resetFilterSettingStore();
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      const image = await upload(file);
      if (image) {
        initializeImageInStore(image, file, "main");
        initializeImageInStore(image, file, "bg");
      }
      routeStore.update((store) => {
        store.siteRoute = "application";
        return store;
      });
    } else {
      throw new Error("No file selected");
    }
  } catch (error) {
    console.error(error);
  }
};
