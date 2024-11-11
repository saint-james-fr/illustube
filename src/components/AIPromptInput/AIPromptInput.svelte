<script lang="ts">
  import { userStore } from "stores";
  import { generateAIImage } from "lib/ai";
  import { enterApplication } from "lib/navigation";
  import closeIcon from "assets/icons/close.png";
  import { clearApiKey } from "lib/auth";

  export let isOpen = false;

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

  const handleClearApiKey = () => {
    clearApiKey();
    isOpen = false;
  };
</script>

<dialog open={isOpen}>
  <article>
    <header>
      <h3>Generate AI Image</h3>
      <div class="api" on:click={() => (isOpen = false)}>
        <img src={closeIcon} />
      </div>
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
      <label
        style="display: flex; align-items: center; gap: 0.2rem; margin-bottom: 1rem; font-size: 0.9rem;"
      >
        <input type="checkbox" bind:checked={$userStore.automaticMode} />
        <div>Automatic mode</div>
      </label>
      <button type="submit" class="button" aria-busy={isLoading}>
        Generate
      </button>
      <button type="button" class="button outline" on:click={handleClearApiKey}>
        Clear API key
      </button>
    </form>
  </article>
</dialog>

<style lang="scss">
  article {
    width: 500px;
    padding: 0;

    @include until($breakpoint) {
      width: 100%;
    }

    h3 {
      margin: 0;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .api {
    img {
      width: 25px;
      filter: invert(1);
      cursor: pointer;
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
      color: var(--primary-inverse);
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

  #prompt {
    cursor: text;
  }
</style>
