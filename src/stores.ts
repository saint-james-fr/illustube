import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import {
  initialUserSettings,
  initialAppSettings,
  initialRouteSettings,
  initialKonvaSettings,
  initialFilterSettings,
} from "lib/default";

export const userStore: Writable<UserStore> = writable(initialUserSettings);

export const appStore: Writable<AppStore> = writable(initialAppSettings);

export const routeStore: Writable<RouteStore> = writable(initialRouteSettings);

export const konvaStore: Writable<KonvaStore> = writable(initialKonvaSettings);

export const filterSettingStore: Writable<FilterSetting> = writable({
  ...initialFilterSettings,
});
