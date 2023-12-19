interface AppStore {
  imageShouldBeSquare: boolean;
  automaticMode: boolean;
}

interface RouteStore {
  currentRoute: "upload" | "metadata" | "position" | "filter" | "download";
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
}

interface KonvaStore {
  stage: Konva.Stage | null;
  bgLayer: Konva.Layer | null;
  bgImage: Konva.Image | null;
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

interface Position {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

type PositionsMap = Map<number, Position>;

interface FilterSetting {
  blur?: number;
  brightness?: number;
  contrast?: number;
  hueRotate?: number;
  invert?: boolean;
  opacity?: number;
  pixelate?: number;
  noise?: number;
  kaleidoscope?: boolean;
}

type FilterSettingsMap = Map<number, FilterSetting>;
