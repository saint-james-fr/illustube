<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import Application from "components/Application/Application.svelte";
  import Home from "components/Home/Home.svelte";
  import Toast from "components/Toast/Toast.svelte";
  import { isBraveBrowser } from "lib/browser";
  import { konvaStore, routeStore } from "stores";
  import { onMount } from "svelte";
  import "tippy.js/animations/perspective-subtle.css";

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
