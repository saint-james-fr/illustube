// Definitions
// MainImage: image principale au centre
// BackgroundImage: image de fond, en arrière plan


/**
 * On stocke ici les routes de l'application.
 */
interface RouteStore {
  siteRoute: "home" | "application" | "credits";
}


/**
 * On stocke ici les réglages globaux de l'application, non liés aux interactions de l'utilisateur.
 */
interface AppStore {
  mainImageShouldBeSquare: boolean;
  pixelRatio: number;
  downscaleThreshold: number;
}


/**
 * On stocke ici les réglages de l'application, liés aux interactions de l'utilisateur.
 */
interface UserStore {
  size: number;
  image: ImportedImage;
  croppedImage: HTMLImageElement | null;
  automaticMode: boolean;
  hideMainImage: boolean;
}


/**
 * On stocke ici les images importées.
 */
interface ImageStore {
  mainImage: ImportedImage;
  backgroundImage: ImportedImage;
}

/**
 * C'est le modèle d'une image importée par l'utilisateur dans l'application avant qu'elle ne soit traitée par Konva.
 */
interface ImportedImage {
  element: HTMLImageElement;
  name: string;
  type: string;
  width: number;
  height: number;
  ratio: number;
  loaded: boolean;
  initialize: (img: HTMLImageElement, file: File) => void;
  reset: () => void;
}

/**
 * On stocke ici les réglages liés à Konva (stage, layers, images, etc.)
 */
interface KonvaStore {
  stage: Konva.Stage | null;
  backgroundLayer: Konva.Layer | null;
  backgroundImage: Konva.Image | null;
  mainImage: Konva.Image | null;
  mainLayer: Konva.Layer | null;
}

/**
 * On stocke ici les choix de l'utilisateur quant aux filtres de Konva.
 */
interface FilterSetting {
  blurValue: number;
  brightnessValue: number;
  saturateValue: number;
  contrastValue: number;
  hueRotateValue: number;
  opacityValue: number;
  grayscaleValue: number;
  pixelateValue: number;
  noiseValue: number;
}
