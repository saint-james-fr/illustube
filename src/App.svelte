<script lang="ts">
  import Application from "components/Application/Application.svelte";
  import Home from "components/Home/Home.svelte";
  import { routeStore, konvaStore } from "stores";
  import Toast from "components/Toast/Toast.svelte";
  import "tippy.js/animations/perspective-subtle.css";
  import { isBraveBrowser } from "lib/browser";
  import { toast } from "@zerodevx/svelte-toast";
  import { onMount } from "svelte";

  onMount(() => {
    if (isBraveBrowser()) {
      toast.push(
        "Brave browser detected! Please disable fingerprinting in Shields settings for better functionality.",
        {
          theme: {
            "--toastBackground": "#000",
            "--toastColor": "#fff",
          },
          duration: 8000,
        }
      );
    }
  });

  $: {
    if ($konvaStore.stage) console.log($konvaStore.stage);
  }
</script>

{#if $routeStore.siteRoute === "home"}
  <Home />
{:else if $routeStore.siteRoute === "application"}
  <Application />
{/if}

<Toast />
