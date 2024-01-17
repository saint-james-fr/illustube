import { konvaStore, appStore } from "stores";
import { get } from "svelte/store";
import { exportImage } from "lib/download";
import { toast } from "@zerodevx/svelte-toast";
import type { SvelteComponent } from "svelte";

export function download(node: HTMLElement) {
  const handleDownload = async () => {
    if (!get(konvaStore).bgImage || !get(konvaStore).mainImage) {
      return;
    }
    toast.push("Download will start soon.");

    exportImage(
      get(konvaStore).stage,
      get(konvaStore).bgImage,
      get(appStore).pixelRatio
    );
  };

  node.addEventListener("click", handleDownload);

  return {
    destroy() {
      node.removeEventListener("click", handleDownload);
    },
  };
}
