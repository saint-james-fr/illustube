<script lang="ts">
  import { konvaStore, userStore } from "stores";
  import settingsIcon from "assets/icons/settings.png";

  const handleManualMode = () => {
    if (!$konvaStore.mainImage || !$konvaStore.bgImage) {
      return;
    }
    $userStore.automaticMode = false;
  };
</script>

<img
  src={settingsIcon}
  alt="reset"
  id="settingsIcon"
  on:click={handleManualMode}
  class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>
