import { konvaStore, filterSettingStore, imageStore } from "stores";
import { validateSize, validateType } from "lib/file";
import { createImage } from "lib/media";
import { get } from "svelte/store";






const storeImage = async (image: HTMLImageElement, file: File) => {
  const store = get(imageStore);
  await store.main.initialize(image, file);
  imageStore.set(store);
};

export const upload = async (files: FileList) => {
  let file = files[0];
  try {
    validateType(file);
    validateSize(file);
    const createdImage = await createImage(file);
    storeImage(createdImage, file);
  } catch (error) {
    console.error(error);
  }
};
