// Definitions
// MainImage: image principale au centre
// BackgroundImage: image de fond, en arrière plan

/**
 * On stocke ici les réglages globaux de l'application, non liés aux imports de l'utilisateur ou à ses choix.
 */interface AppStore {
  mainImageShouldBeSquare: boolean;
  pixelRatio: number;
  downscaleThreshold: number;
}

interface RouteStore {
  siteRoute: "home" | "application" | "credits";
}

interface UserStore {
  size: number,
  image: ImportedImage;
  croppedImage: HTMLImageElement | null;
  automaticMode: boolean;
  hideMainImage: boolean;
}

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

interface KonvaStore {
  stage: Konva.Stage | null;
  backgroundLayer: Konva.Layer | null;
  backgroundImage: Konva.Image | null;
  mainImage: Konva.Image | null;
  mainLayer: Konva.Layer | null;
}

interface ImageManipulation {}

// interface MetaData {
//   useMetaData: boolean;
//   artist: string;
//   title: string;
//   album: string;
//   year: string;
//   showArtist: boolean;
//   showTitle: boolean;
//   showAlbum: boolean;
//   showYear: boolean;
// }

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

type FilterSettingsMap = Map<number, FilterSetting>;
