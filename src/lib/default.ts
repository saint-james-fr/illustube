import Konva from "konva";
import type { TransformerConfig } from "konva/lib/shapes/Transformer";
import { bytesToMb } from "./file";
import { cropImage } from "./media";

export const initialBgSettings: ImportedImage = {
  element: new Image(),
  cropped: null,
  name: "",
  type: "",
  width: 0,
  height: 0,
  ratio: 0,
  size: 0,
  loaded: false,
  initialize: async function (img: HTMLImageElement, file: File) {
    this.element = img;
    this.cropped = await (async () => {
      const croppedImage = await cropImage(img);
      let image = new Image();
      image.src = croppedImage;
      return image;
    })();
    this.name = file.name;
    this.type = file.type;
    this.width = img.width;
    this.height = img.height;
    this.ratio = img.width / img.height;
    this.loaded = true;
    this.size = bytesToMb(file.size);
  },
  reset: function () {
    this.element = new Image();
    this.name = "";
    this.type = "";
    this.width = 0;
    this.height = 0;
    this.ratio = 0;
    this.size = 0;
    this.loaded = false;
  },
};

export const initialMainSettings: ImportedImage = {
  element: new Image(),
  cropped: null,
  name: "",
  type: "",
  width: 0,
  height: 0,
  ratio: 0,
  size: 0,
  loaded: false,
  initialize: async function (img: HTMLImageElement, file: File) {
    this.element = img;
    this.cropped = await (async () => {
      const croppedImage = await cropImage(img);
      let image = new Image();
      image.src = croppedImage;
      return image;
    })();
    this.name = file.name;
    this.type = file.type;
    this.width = img.width;
    this.height = img.height;
    this.ratio = img.width / img.height;
    this.loaded = true;
    this.size = bytesToMb(file.size);
  },
  reset: function () {
    this.element = new Image();
    this.name = "";
    this.type = "";
    this.width = 0;
    this.height = 0;
    this.ratio = 0;
    this.size = 0;
    this.loaded = false;
  },
};

export const initialImageStoreSettings = {
  main: initialMainSettings,
  bg: initialBgSettings,
};

export const initialUserSettings: UserStore = {
  automaticMode: false,
  hideMainImage: false,
  backgroundColor: "#031313",
  showSettingMobileToggle: true,
};

export const initialAppSettings: AppStore = {
  mainImageShouldBeSquare: true,
  pixelRatio: 3,
  downscaleThreshold: 2,
};

export const initialRouteSettings: RouteStore = {
  siteRoute: "home",
};

export const initialKonvaSettings: KonvaStore = {
  stage: null,
  bgLayer: null,
  bgImage: null,
  mainLayer: null,
  mainImage: null,
  backgroundColorRectLayer: null,
  backgroundColorRect: null,
  reset: function () {
    this.stage = null;
    this.bgLayer = null;
    this.bgImage = null;
    this.mainLayer = null;
    this.mainImage = null;
    this.backgroundColorRectLayer = null;
    this.backgroundColorRect = null;
  },
};

export const initialTransformerSettings: TransformerConfig = {
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
  anchorStroke: "#081417",
  anchorSize: 10,
  centeredScaling: true,
  flipEnabled: false,
};

export const initialFilterSettings = {
  blurRadius: 0,
  brightnessValue: 0,
  contrastValue: 0,
  hueRotateValue: 0,
  opacityValue: 100,
  saturateValue: 0,
  grayscaleValue: 0,
  pixelateValue: 1,
  noiseValue: 0,
  reset: function () {
    this.blurRadius = 0;
    this.brightnessValue = 0;
    this.contrastValue = 0;
    this.hueRotateValue = 0;
    this.opacityValue = 100;
    this.saturateValue = 0;
    this.grayscaleValue = 0;
    this.pixelateValue = 1;
    this.noiseValue = 0;
  },
};

export const initFiltersValue = {
  minBlurValue: 0,
  maxBlurValue: 45,
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
  blurRadius: 12,
  brightnessValue: -0.2,
  contrastValue: -5,
  hueRotateValue: 0,
  opacityValue: 100,
  saturateValue: 0,
  grayscaleValue: 0,
  pixelateValue: 1,
  noiseValue: 0.05,
  reset: function () {
    this.blurRadius = 0;
    this.brightnessValue = 0;
    this.contrastValue = 0;
    this.hueRotateValue = 0;
    this.opacityValue = 100;
    this.saturateValue = 0;
    this.grayscaleValue = 0;
    this.pixelateValue = 1;
    this.noiseValue = 0;
  },
};
