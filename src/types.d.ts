interface AppStore {
  imageShouldBeSquare: boolean;
  backgroundImageCoverAndCenter: boolean;
  pixelRatio: number;
  automaticMode: boolean;
}

interface RouteStore {
  currentRoute: "upload" | "metadata" | "modification" | "filter" | "download";
}

interface UserStore {
  image: ImportedImage;
  croppedImage: HTMLImageElement | null;
  metaData: MetaData;
  choosedPosition?: number;
  choosedFilter?: number;
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

interface MetaData {
  useMetaData: boolean;
  artist: string;
  title: string;
  album: string;
  year: string;
  showArtist: boolean;
  showTitle: boolean;
  showAlbum: boolean;
  showYear: boolean;
}

// interface Position {
//   id: number;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// type PositionsMap = Map<number, Position>;

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
