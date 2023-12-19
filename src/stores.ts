import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

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
  metaData: initialMetaDataSettings,
  choosedPosition: undefined,
  choosedFilter: undefined,
});

export const appStore: Writable<AppStore> = writable({
  imageShouldBeSquare: true,
  imageHasBeenUploaded: false,
});

export const routeStore: Writable<RouteStore> = writable({
  currentRoute: "upload",
});
