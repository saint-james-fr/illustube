import Konva from "konva";


export const initialImageSettings: ImportedImage = {
  element: new Image(),
  name: "",
  type: "",
  width: 0,
  height: 0,
  ratio: 0,
  loaded: false,
  initialize: function (img: HTMLImageElement, file: File) {
    this.element = img;
    this.name = file.name;
    this.type = file.type;
    this.width = img.width;
    this.height = img.height;
    this.ratio = img.width / img.height;
    this.loaded = true;
  },
  reset: function () {
    this.element = new Image();
    this.name = "";
    this.type = "";
    this.width = 0;
    this.height = 0;
    this.ratio = 0;
    this.loaded = false;
  },
};

export const initialMetaDataSettings: MetaData = {
  useMetaData: true,
  artist: "",
  title: "",
  album: "",
  year: "",
  showArtist: true,
  showTitle: true,
  showAlbum: true,
  showYear: true,
};

export const initialUserSettings: UserStore = {
  image: initialImageSettings,
  croppedImage: null,
  metaData: initialMetaDataSettings,
  choosedPosition: undefined,
  choosedFilter: undefined,
};

export const initialAppSettings: AppStore = {
  imageShouldBeSquare: true,
  backgroundImageCoverAndCenter: true,
  pixelRatio: 3,
  automaticMode: false,
  hideMainImage: false,
};

export const initialRouteSettings: RouteStore = {
  currentRoute: "upload",
};

export const initialKonvaSettings: KonvaStore = {
  stage: null,
  backgroundLayer: null,
  backgroundImage: null,
  mainLayer: null,
  mainImage: null,
};

export const initialFilterSettings = {
  blurValue: 0,
  brightnessValue: 0,
  contrastValue: 0,
  hueRotateValue: 0,
  opacityValue: 100,
  saturateValue: 0,
  grayscaleValue: 0,
  pixelateValue: 1,
  noiseValue: 0,
};

export const initialTransformerSettings = new Konva.Transformer({
  rotationSnaps: [0, 90, 180, 270],
  rotateAnchorOffset: 20,
  padding: 10,
  rotateAnchorCursor: "grab",
  rotateEnabled: true,
  rotationSnapTolerance: 5,
  borderEnabled: true,
  borderStroke: "#fffaf2",
  borderStrokeWidth: 3,
  borderDash: [1, 1],
  enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
  anchorFill: "#fffaf2",
  anchorStrokeWidth: 2,
  anchorCornerRadius: 10,
  anchorStroke: "#1e90ff",
  anchorSize: 10,
  centeredScaling: true,
  flipEnabled: false,
});

export const initFiltersValue = {
  minBlurValue: 0,
  maxBlurValue: 100,
  minBrightnessValue: -0.5,
  maxBrightnessValue: 0.5,
  minContrastValue: -20,
  maxContrastValue: 20,
  minHueRotateValue: -180,
  maxHueRotateValue: 180,
  minOpacityValue: 0,
  maxOpacityValue: 1,
  minNoiseValue: 0,
  maxNoiseValue: 0.5,
  minPixelateValue: 1,
  maxPixelateValue: 100,
};

export const filterSettingsAutomatic = {
  blurValue: 30,
  brightnessValue: 0,
  contrastValue: 0,
  hueRotateValue: 0,
  opacityValue: 100,
  saturateValue: 0,
  grayscaleValue: 0,
  pixelateValue: 1,
  noiseValue: 0,
};
