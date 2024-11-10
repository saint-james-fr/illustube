<script lang="ts">
  import { konvaStore, userStore } from "stores";

  const handleManualMode = () => {
    if (!$konvaStore.mainImage || !$konvaStore.bgImage) {
      return;
    }
    $userStore.automaticMode = false;
  };
</script>

<p>When hovering on the background image, scroll to resize.</p>
{#if $userStore.automaticMode}
  <p>
    You're in <strong>automatic mode</strong>.
  </p>
  <p>
    Enter the <span
      class="primary pointer"
      tabindex="0"
      on:click={handleManualMode}><strong>manual mode</strong></span
    > to access more features.
  </p>
{/if}

<style>
  .pointer {
    cursor: pointer;
  }
</style>
