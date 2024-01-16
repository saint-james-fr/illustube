interface RouteStore {
  siteRoute: "home" | "application" | "credits";
}

interface AppStore {
  mainImageShouldBeSquare: boolean;
  pixelRatio: number;
  downscaleThreshold: number;
}

interface UserStore {
  automaticMode: boolean;
  hideMainImage: boolean;
}

interface ImageStore {
  main: ImportedImage;
  bg: ImportedImage;
}

interface ImportedImage {
  element: HTMLImageElement;
  cropped: HTMLImageElement | null;
  name: string;
  type: string;
  width: number;
  height: number;
  ratio: number;
  loaded: boolean;
  size: number;
  initialize: (img: HTMLImageElement, file: File) => Promise<void>;
  reset: () => void;
}

interface KonvaStore {
  stage: Konva.Stage | null;
  bgLayer: Konva.Layer | null;
  bgImage: Konva.Image | null;
  mainImage: Konva.Image | null;
  mainLayer: Konva.Layer | null;
  reset: () => void;
}

interface FilterSetting {
  blurRadius: number;
  brightnessValue: number;
  saturateValue: number;
  contrastValue: number;
  hueRotateValue: number;
  opacityValue: number;
  grayscaleValue: number;
  pixelateValue: number;
  noiseValue: number;
  reset: () => void;
}
