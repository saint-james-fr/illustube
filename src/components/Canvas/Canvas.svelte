<script lang="ts">
  import { userStore } from "stores";
  import { onMount } from "svelte";
  import { Stage, Layer, Image as KonvaImage } from "svelte-konva";

  let stageWidth: number;
  let stageHeight: number;
  let innerHeight: number;
  let innerWidth: number;

  onMount(() => {
    stageWidth = innerWidth / 2;
    stageHeight = (stageWidth / 16) * 9;
    console.log(stageHeight, stageWidth);
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if $userStore.image.loaded}
  <Stage config={{ width: stageWidth, height: stageHeight }}>
    <Layer>
      <KonvaImage
        config={{
          image: $userStore.image.element,
          width: $userStore.image.width,
          height: $userStore.image.height,
          draggable: true,
        }}
      />
    </Layer>
  </Stage>
{/if}
