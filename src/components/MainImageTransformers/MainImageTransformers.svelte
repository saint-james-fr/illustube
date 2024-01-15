<script lang="ts">
  import { transformerStore, konvaStore } from "stores";
  import Konva from "konva";
  import { onMount } from "svelte";

  export let mainImage: Konva.Image;

  onMount(() => {
    console.log("mainImage", mainImage);
    transformerStore.update((store) => {
      store.nodes([mainImage]);
      return store;
    });
    console.log("transformerStore", transformerStore);
    
    console.log("draw");
    $konvaStore.mainLayer.add($transformerStore);
    $konvaStore.mainLayer.draw();
    

    return () => {
      transformerStore.update((store) => {
        store.nodes([]);
        return store;
      });

      $konvaStore.backgroundLayer.draw();
    };
  });
</script>
