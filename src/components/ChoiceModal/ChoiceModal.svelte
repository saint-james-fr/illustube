<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{
    choice: "upload" | "generate";
  }>();

  export let isOpen = false;
  export let mode: "automatic" | "manual";

  const handleChoice = (choice: "upload" | "generate") => {
    dispatch("choice", choice);
    isOpen = false;
  };

  const handleClose = () => {
    isOpen = false;
  };
</script>

<dialog open={isOpen}>
  <article class="modal">
    <header>
      <h3>Choose Image Source</h3>
      <button class="close" on:click={handleClose}>✕</button>
    </header>
    <p>Would you like to upload an image or generate one using AI?</p>
    <footer>
      <button  on:click={() => handleChoice("upload")}>
        Upload Image
      </button>
      <button on:click={() => handleChoice("generate")}>
        Generate with AI
      </button>
    </footer>
  </article>
</dialog>

<style lang="scss">
  dialog {
    max-width: 400px;

    .header {
      background: none !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--h3-color);
      position: relative;
      top: -10px;
      right: 0;
    }
  }

  footer {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
</style>
