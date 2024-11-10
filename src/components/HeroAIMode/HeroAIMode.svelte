<script lang="ts">
  import AIPromptInput from "components/AIPromptInput/AIPromptInput.svelte";
  import { userStore } from "stores";
  import { enterApplication } from "lib/navigation";
  import sparklesIcon from "assets/icons/sparkles.png";

  let showPromptInput = false;

  const handleMainImageGenerated = (event: CustomEvent<File>) => {
    const file = event.detail;
    $userStore.automaticMode = true;
    enterApplication({ target: { files: [file] } } as unknown as Event);
  };
</script>

<button on:click={() => (showPromptInput = true)} class="button shadow ai">
  USE AI <img src={sparklesIcon} alt="sparkles" />
</button>

<AIPromptInput
  bind:isOpen={showPromptInput}
  mode="automatic"
  on:mainImageGenerated={handleMainImageGenerated}
/>

<style lang="scss">
  :global(.button) {
    text-transform: uppercase;
  }

  .ai {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;

    img {
      width: 15px;
      filter: invert(1);
      opacity: 0.8;
    }
  }
</style>
