<script lang="ts">
  import { konvaStore } from "stores";
  import resetIcon from "assets/icons/reset.png";
  import { emptyFilters } from "lib/konva/filters";
  import { toast } from "@zerodevx/svelte-toast";
  import { resetFilterSettingStore } from "lib/storesFunctions";
  resetFilterSettingStore();

  const handleReset = () => {
    if (!$konvaStore.bgImage || !$konvaStore.bgImage) {
      return;
    }
    resetFilterSettingStore();
    emptyFilters();
    $konvaStore.bgImage.cache();
    toast.push("Filters have been reset.");
  };
</script>

<img
  src={resetIcon}
  alt="reset"
  id="resetIcon"
  on:click={handleReset}
  class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>
