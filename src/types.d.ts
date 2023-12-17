interface LayerType {
  id?: string;
  name?: string;
  type?: string;
  visible?: boolean;
  opacity?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  image?: string;
  data?: number[];
}

interface SettingsType {
  automaticMode: boolean;
  imageSettings: ImageSettings;
}


interface ImageSettings {
  blurValue: number;
  brightnessValue: number;
  contrastValue: number;
  grayscaleValue: number;
  hueRotateValue: number;
  invertValue: number;
  opacityValue: number;
  saturateValue: number;
  noiseValue: number;
}
