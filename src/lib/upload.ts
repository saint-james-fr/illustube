import {
  appStore,
  konvaStore,
  routeStore,
  userStore,
  filterSettingStore,
} from "stores";
import { get } from "svelte/store";
import { validateSize, validateType } from "lib/file";
import { createImageFromFile, cropImage } from "lib/media";
import { initialKonvaSettings, initialFilterSettings } from "lib/default";
import { filterRoutine } from "lib/filters";

export const upload = async (files: FileList) => {
  const nextRoute = "settings";

  const emptyDataFromStores = () => {
    userStore.update((store) => {
      store.croppedImage = null;
      store.image.reset();
      return store;
    });

    appStore.update((store) => {
      store.hideMainImage = false;
      return store;
    });

    konvaStore.update(() => {
      return initialKonvaSettings;
    });

    filterSettingStore.update(() => {
      return initialFilterSettings;
    });
  };

  const updateImageFromStore = (image: HTMLImageElement, file: File) => {
    userStore.update((store) => {
      store.image?.initialize(image, file);
      return store;
    });
  };

  const updateCroppedImageFromStore = (image: HTMLImageElement) => {
    userStore.update((store) => {
      store.croppedImage = image;
      return store;
    });
  };
  const handleCroppedImageCreation = async (image: HTMLImageElement) => {
    // If we need to crop, we crop then assign the cropped image to the store for later use
    const croppedImageUrl = await cropImage(image);
    const croppedImage = new Image();
    croppedImage.onload = () => {
      updateCroppedImageFromStore(croppedImage);
    };
    croppedImage.src = croppedImageUrl;
  };

  const updateRoute = () => {
    if (get(routeStore)?.applicationRoute === nextRoute) return;

    routeStore.update((store) => {
      store.applicationRoute = nextRoute;
      return store;
    });
  };

  let file = files[0];
  // we empty the data from the stores
  emptyDataFromStores();
  console.log(get(appStore)?.automaticMode);
  try {
    validateType(file);
    validateSize(file);
    // we create an image from the file
    const createdImage = await createImageFromFile(file);
    console.log("created image", createdImage);
    // we update the store
    console.log("updating image from store");
    updateImageFromStore(createdImage, file);

    if (get(appStore)?.imageShouldBeSquare) {
      console.log("image should be square");
      await handleCroppedImageCreation(createdImage);
    }
    updateRoute();
    filterRoutine();
  } catch (error) {
    console.error(error);
  }
};
