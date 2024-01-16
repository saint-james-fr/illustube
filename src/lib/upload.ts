import { appStore, konvaStore, userStore, filterSettingStore } from "stores";
import { get } from "svelte/store";
import { validateSize, validateType } from "lib/file";
import { createImageFromFile, cropImage } from "lib/media";
import { initialKonvaSettings, initialFilterSettings } from "lib/default";
import { filterRoutine } from "lib/konva/filters";

const resetStores = () => {
  userStore.update((store) => {
    // TODO : why this line?
    store.croppedImage = null;
    store.image.reset();
    return store;
  });

  konvaStore.update(() => {
    return initialKonvaSettings;
  });

  filterSettingStore.update(() => {
    return initialFilterSettings;
  });
};

const initializeImportedImageAndStoreIt = (
  image: HTMLImageElement,
  file: File
) => {
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

const storeSize = (size: number) => {
  userStore.update((store) => {
    store.size = size;
    return store;
  });
};

type UploadOptions = {
  automaticMode: boolean;
  squareImage: boolean;
};

export const upload = async (files: FileList, options: UploadOptions) => {
  const { automaticMode, squareImage } = options;
  let file = files[0];
  resetStores();
  try {
    validateType(file);
    const size = validateSize(file);
    storeSize(size);
    const createdImage = await createImageFromFile(file);
    initializeImportedImageAndStoreIt(createdImage, file);
    if (squareImage) await handleCroppedImageCreation(createdImage); 
    if (automaticMode) filterRoutine();
  } catch (error) {
    console.error(error);
  }
};
