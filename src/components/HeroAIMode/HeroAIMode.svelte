<script lang="ts">
  import { apiKeyStore } from "stores";
  import ApiKeyInput from "components/ApiKeyInput/ApiKeyInput.svelte";
  import AIPromptInput from "components/AIPromptInput/AIPromptInput.svelte";
  import { userStore } from "stores";
  import { enterApplication } from "lib/navigation";
  import sparklesIcon from "assets/icons/sparkles.png";

  let showPromptInput = false;
  let showApiKeyInput = false;

  const handleAIClick = () => {
    if (!$apiKeyStore.isValid) {
      showApiKeyInput = true;
    } else {
      showPromptInput = true;
    }
  };

  const handleKeyValidated = () => {
    showApiKeyInput = false;
    showPromptInput = true;
  };

  const handleMainImageGenerated = (event: CustomEvent<File>) => {
    const file = event.detail;
    $userStore.automaticMode = true;
    enterApplication({ target: { files: [file] } } as unknown as Event);
  };
</script>

<button on:click={handleAIClick} class="button shadow ai">
  USE AI <img src={sparklesIcon} alt="sparkles" />
</button>

<dialog open={showApiKeyInput}>
  <ApiKeyInput
    on:close={() => (showApiKeyInput = false)}
    on:keyValidated={handleKeyValidated}
  />
</dialog>

<AIPromptInput
  bind:isOpen={showPromptInput}
  on:mainImageGenerated={handleMainImageGenerated}
/>

<style lang="scss">
  :global(.button) {
    text-transform: uppercase;
  }

  .ai {
    filter: hue-rotate(-20deg);
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
