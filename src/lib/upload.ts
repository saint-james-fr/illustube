import { konvaStore, userStore, filterSettingStore } from "stores";
import { validateSize, validateType } from "lib/file";
import { createImage, cropImage } from "lib/media";
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

const storeImage = (
  image: HTMLImageElement,
  file: File
) => {
  userStore.update((store) => {
    store.image?.initialize(image, file);
    return store;
  });
};

const handleSquareImage = async (image: HTMLImageElement) => {
  // 1. Crop
  const croppedImageUrl = await cropImage(image);
  const croppedImage = new Image();
  // 2. Update Store
  croppedImage.onload = () => {
    userStore.update((store) => {
      store.croppedImage = image;
      return store;
    });
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
    const createdImage = await createImage(file);
    storeImage(createdImage, file);
    if (squareImage) await handleSquareImage(createdImage);
    if (automaticMode) filterRoutine();
  } catch (error) {
    console.error(error);
  }
};
