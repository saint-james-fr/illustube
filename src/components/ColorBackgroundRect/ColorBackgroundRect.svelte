<script lang="ts">
  import type Konva from "konva";
  import { Rect } from "svelte-konva";
  import { konvaStore } from "stores";

  let backgroundColorRect: Konva.Rect;

  $: {
    $konvaStore.backgroundColorRect = backgroundColorRect;
  }
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
