<script lang="ts">
  import AIPromptInput from "components/AIPromptInput/AIPromptInput.svelte";
  import { userStore } from "stores";
  import { enterApplication } from "lib/navigation";

  let showPromptInput = false;

  const handleMainImageGenerated = (event: CustomEvent<File>) => {
    const file = event.detail;
    $userStore.automaticMode = true;
    enterApplication({ target: { files: [file] } } as unknown as Event);
  };
</script>

<button on:click={() => (showPromptInput = true)} class="button shadow">
  AI mode
</button>

<AIPromptInput
  bind:isOpen={showPromptInput}
  mode="automatic"
  on:mainImageGenerated={handleMainImageGenerated}
/>

<style>
  :global(.button) {
    text-transform: uppercase;
  }
</style>
