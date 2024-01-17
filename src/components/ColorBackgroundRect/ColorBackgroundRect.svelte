<script lang="ts">
  import type Konva from "konva";
  import { Rect } from "svelte-konva";
  import { konvaStore } from "stores";
  import { onMount } from "svelte";

  export let canvasContainer: HTMLDivElement;
  let backgroundColorRect: Konva.Rect;

  $: {
    $konvaStore.backgroundColorRect = backgroundColorRect;
    if (canvasContainer && backgroundColorRect) {
      backgroundColorRect.width(canvasContainer.clientWidth);
      backgroundColorRect.height(canvasContainer.clientHeight);
    }
  }

  onMount(() => {
    if (canvasContainer && backgroundColorRect) {
      backgroundColorRect.width(canvasContainer.clientWidth);
      backgroundColorRect.height(canvasContainer.clientHeight);
    }
  });
</script>

<Rect
  bind:handle={backgroundColorRect}
  config={{
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    fill: "white",
  }}
/>
