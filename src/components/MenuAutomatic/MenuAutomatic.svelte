<script lang="ts">
  import { konvaStore, userStore } from "stores";
  import baguetteIcon from "assets/icons/baguette.png";
  import { filterRoutine } from "lib/konva/filters";

  const handleAutomaticMode = () => {
    if (!$konvaStore.mainImage || !$konvaStore.bgImage) {
      return;
    }
    $userStore.automaticMode = true;
    filterRoutine($konvaStore.bgImage);
  };
</script>

<img
  src={baguetteIcon}
  alt="reset"
  id="baguetteIcon"
  on:click={handleAutomaticMode}
  class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>
