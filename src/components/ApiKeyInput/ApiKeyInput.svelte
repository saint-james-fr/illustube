<script lang="ts">
  import { apiKeyStore } from "stores";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let apiKey = $apiKeyStore.key || "";
  let isLoading = false;
  let error = "";

  // If we already have a valid key, dispatch immediately
  if ($apiKeyStore.isValid) {
    dispatch("keyValidated");
  }

  const validateApiKey = async (key: string): Promise<boolean> => {
    try {
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!apiKey.trim()) {
      error = "Please enter an API key";
      return;
    }

    try {
      isLoading = true;
      error = "";

      const isValid = await validateApiKey(apiKey);

      if (isValid) {
        apiKeyStore.update(() => ({
          key: apiKey,
          isValid: true,
        }));
        dispatch("keyValidated");
      } else {
        error = "Invalid API key";
      }
    } catch (err) {
      error = "Failed to validate API key";
    } finally {
      isLoading = false;
    }
  };
</script>

<article>
  <h3>Enter your OpenAI API Key</h3>
  <p>
    To use AI features, you'll need to provide your OpenAI API key. Your key is
    stored locally and never sent to our servers.
  </p>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="apiKey">
      <input
        type="password"
        id="apiKey"
        bind:value={apiKey}
        placeholder="sk-..."
        disabled={isLoading}
      />
    </label>
    {#if error}
      <small class="error">{error}</small>
    {/if}
    <button type="submit" aria-busy={isLoading}>
      {$apiKeyStore.isValid ? 'Update Key' : 'Validate Key'}
    </button>
  </form>
</article>

<style lang="scss">
  article {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;

    p {
      font-size: 0.8rem;
    }
  }

  .error {
    color: var(--error-color);
  }
</style>
