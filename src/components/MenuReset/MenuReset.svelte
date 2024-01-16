<script lang="ts">
  import { konvaStore } from "stores";
  import resetIcon from "assets/icons/reset.png";
  import { resetFilters } from "lib/konva/filters";
  import { toast } from "@zerodevx/svelte-toast";

  const handleReset = () => {
    if (!$konvaStore.bgImage || !$konvaStore.bgImage) {
      return;
    }
    resetFilters();
    toast.push("Filters reset")
  };
</script>

<img
  src={resetIcon}
  alt="reset"
  id="resetIcon"
  on:click={handleReset}
  class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>
