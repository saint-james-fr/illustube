import { validateSize, validateType } from "lib/file";
import { createImage } from "lib/media";

export const upload = async (file: File) => {
  try {
    validateType(file);
    validateSize(file);
    return await createImage(file);
  } catch (error) {
    console.error(error);
  }
};
