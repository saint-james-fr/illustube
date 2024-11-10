<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { userStore } from "stores";
  import { generateAIImage } from "lib/ai";
  import { initializeImageInStore } from "lib/storesFunctions";
  import { enterApplication } from "lib/navigation";

  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let mode: "automatic" | "manual";

  let prompt = "";
  let isLoading = false;
  let error = "";

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      error = "Please enter a prompt";
      return;
    }

    try {
      isLoading = true;
      error = "";

      const image = await generateAIImage(prompt);
      if (image) {
        $userStore.automaticMode = mode === "automatic";
        // Convert base64 to File object
        const file = await fetch(image)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new File([blob], "ai-generated.png", { type: "image/png" })
          );

        enterApplication({ target: { files: [file] } } as unknown as Event);
        isOpen = false;
      }
    } catch (err) {
      error = "Failed to generate image. Please try again.";
    } finally {
      isLoading = false;
    }
  };
</script>

<dialog open={isOpen}>
  <article>
    <header>
      <h3>Generate AI Image</h3>
    </header>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="prompt">
        <span>Describe the image you want to generate</span>
        <input
          id="prompt"
          type="text"
          bind:value={prompt}
          placeholder="A serene mountain landscape..."
          disabled={isLoading}
        />
      </label>
      {#if error}
        <small class="error">{error}</small>
      {/if}
      <button type="submit" aria-busy={isLoading}> Generate </button>
      <button type="button" class="outline" on:click={() => (isOpen = false)}>
        Cancel
      </button>
    </form>
  </article>
</dialog>

<style lang="scss">
  article {
    width: 500px;

    @include until($breakpoint) {
      width: 100%;
    }
  }
  dialog {
    max-width: 500px;
  }

  label {
    font-size: 1rem;

    span {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  .error {
    color: var(--error-color);
  }

  footer {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }
</style>
