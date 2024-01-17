<script lang="ts">
  import { konvaStore } from "stores";
  import resetIcon from "assets/icons/reset.png";
  import { emptyFilters } from "lib/konva/filters";
  import { toast } from "@zerodevx/svelte-toast";
  import { resetFilterSettingStore } from "lib/storesFunctions";
  import { tippy } from "svelte-tippy";

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

<span
  use:tippy={{
    content: "RESET FILTERS",
    placement: "right",
    animation: "perspective-subtle",
  }}
>
  <img
    src={resetIcon}
    alt="reset"
    id="resetIcon"
    on:click={handleReset}
    class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
  />
</span>
