<script lang="ts">
  import { konvaStore, aiModalStore, apiKeyStore } from "stores";
  import sparklesIcon from "assets/icons/sparkles.png";
  import { tippy } from "svelte-tippy";

  const handleAIClick = () => {
    if (!$konvaStore.mainImage || !$konvaStore.bgImage) {
      return;
    }

    if (!$apiKeyStore.isValid) {
      // Show API key input modal first
      aiModalStore.set({ isOpen: false, showApiKeyInput: true });
    } else {
      aiModalStore.set({ isOpen: true, showApiKeyInput: false });
    }
  };
</script>

<span
  use:tippy={{
    content: "GENERATE WITH AI",
    placement: "right",
    animation: "perspective-subtle",
  }}
>
  <img
    src={sparklesIcon}
    alt="AI generation"
    on:click={handleAIClick}
    class:gray={!$konvaStore.bgImage || !$konvaStore.mainImage}
  />
</span>

<style lang="scss">
  img {
    width: 28px;
    cursor: pointer;
  }
</style>
