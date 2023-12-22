import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import Konva from "konva";

const initialImageSettings = {
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

const initialMetaDataSettings = {
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

export const userStore: Writable<UserStore> = writable({
  image: initialImageSettings,
  croppedImage: null,
  metaData: initialMetaDataSettings,
  choosedPosition: undefined,
  choosedFilter: undefined,
});

export const appStore: Writable<AppStore> = writable({
  imageShouldBeSquare: true,
  backgroundImageCoverAndCenter: true,
  pixelRatio: 3,
  automaticMode: true,
});

export const routeStore: Writable<RouteStore> = writable({
  currentRoute: "upload",
});

export const konvaStore: Writable<KonvaStore> = writable({
  stage: null,
  backgroundLayer: null,
  backgroundImage: null,
  mainLayer: null,
  mainImage: null,
});

export const filterSettingsManual = {
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

export const filterSettingStore: Writable<FilterSetting> = writable({
  ...filterSettingsManual,
});

const initialTransformer = new Konva.Transformer({
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
export const transformerStore: Writable<Konva.Transformer> =
  writable(initialTransformer);
