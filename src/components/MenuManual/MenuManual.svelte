<script lang="ts">
  import { konvaStore, userStore } from "stores";
  import settingsIcon from "assets/icons/settings.png";
  import { tippy } from "svelte-tippy";


  const handleManualMode = () => {
    if (!$konvaStore.mainImage || !$konvaStore.bgImage) {
      return;
    }
    $userStore.automaticMode = false;
  };
</script>

<span
  use:tippy={{
    content: "MANUAL MODE",
    placement: "right",
    animation: "perspective-subtle",
  }}
>
<img
  src={settingsIcon}
  alt="reset"
  id="settingsIcon"
  on:click={handleManualMode}
  class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>
</span>