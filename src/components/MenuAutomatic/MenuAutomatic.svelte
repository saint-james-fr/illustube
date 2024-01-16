<script lang="ts">
  import { konvaStore, userStore } from "stores";
  import baguetteIcon from "assets/icons/baguette.png";
  import { filterRoutine } from "lib/konva/filters";


  const handleManualMode = () => {
    if (!$konvaStore.mainImage || !$konvaStore.bgImage) {
      return;
    }
    $userStore.automaticMode = true;
    filterRoutine();
  };
</script>

<img
  src={baguetteIcon}
  alt="reset"
  id="baguetteIcon"
  on:click={handleManualMode}
  class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>
