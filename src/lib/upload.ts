import { appStore, routeStore, userStore } from "stores";
import { get } from "svelte/store";
import { validateSize, validateType } from "lib/file";
import { createImageFromFile, cropImage } from "lib/media";

export const upload = async (event: Event) => {
  const nextRoute = "modification";

  const emptyDataFromStore = () => {
    userStore.update((store) => {
      store.croppedImage = null;
      store.image.reset();
      return store;
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
    routeStore.update((store) => {
      store.currentRoute = nextRoute;
      return store;
    });
  };

  const input = event.target as HTMLInputElement;
  if (input.files) {
    let file = input.files[0];
    // we empty the data from the store
    emptyDataFromStore();
    try {
      validateType(file);
      validateSize(file);
      // we create an image from the file
      const createdImage = await createImageFromFile(file);
      // we update the store
      updateImageFromStore(createdImage, file);

      if (get(appStore)?.imageShouldBeSquare) {
        await handleCroppedImageCreation(createdImage);
      }
      updateRoute();
    } catch (error) {
      console.error(error);
    }
  }
};
