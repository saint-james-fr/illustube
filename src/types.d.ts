type FilterType = typeof Konva.Filters[keyof typeof Konva.Filters];


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
  hueRotateValue: number;
  invertValue: boolean;
  opacityValue: number;
  pixelateValue: number;
  noiseValue: number;
  kaleidoscopeValue: boolean;
  
}
