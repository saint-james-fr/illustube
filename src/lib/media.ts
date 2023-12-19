export const validateRatio = (ratio: number) => {
  return ratio == 1;
};

export const centerImage = (
  stageWidth: number,
  stageHeight: number,
  imageWidth: number,
  imageHeight: number
) => {
  const x = (stageWidth - imageWidth) / 2;
  const y = (stageHeight - imageHeight) / 2;
  return { x, y };
};



export const cropImage = (img: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const { width, height } = img;
      const ratio = width / height;
      const cropWidth = ratio > 1 ? height : width;
      const cropHeight = ratio > 1 ? height : width;
      const cropX = (width - cropWidth) / 2;
      const cropY = (height - cropHeight) / 2;
      const canvas = document.createElement("canvas");
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );
        resolve(canvas.toDataURL("image/jpeg"));
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const createImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      if (event.target) img.src = event.target.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
};
