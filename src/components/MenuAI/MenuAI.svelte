<script lang="ts">
  import { konvaStore, aiModalStore } from "stores";
  import sparklesIcon from "assets/icons/sparkles.png";
  import { tippy } from "svelte-tippy";

  const handleAIClick = () => {
    if (!$konvaStore.mainImage || !$konvaStore.bgImage) {
      return;
    }
    aiModalStore.set({ isOpen: true });
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
