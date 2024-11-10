import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import {
  initialUserSettings,
  initialAppSettings,
  initialRouteSettings,
  initialKonvaSettings,
  initialFilterSettings,
  initialImageStoreSettings,
} from "lib/default";

export const userStore: Writable<UserStore> = writable(initialUserSettings);

export const appStore: Writable<AppStore> = writable(initialAppSettings);

export const routeStore: Writable<RouteStore> = writable(initialRouteSettings);

export const konvaStore: Writable<KonvaStore> = writable(initialKonvaSettings);

export const imageStore: Writable<ImageStore> = writable(
  initialImageStoreSettings
);

export const filterSettingStore: Writable<FilterSetting> = writable(
  initialFilterSettings
);

const storedApiKey = sessionStorage.getItem("apiKey");
const initialApiKeyState: ApiKeyStore = storedApiKey
  ? JSON.parse(storedApiKey)
  : { key: "", isValid: false };

export const apiKeyStore = writable<ApiKeyStore>(initialApiKeyState);

// Subscribe to changes and update sessionStorage
apiKeyStore.subscribe((state) => {
  if (state.key && state.isValid) {
    sessionStorage.setItem("apiKey", JSON.stringify(state));
  } else {
    sessionStorage.removeItem("apiKey");
  }
});
