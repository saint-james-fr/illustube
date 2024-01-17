<script lang="ts">
  import Application from "components/Application/Application.svelte";
  import Home from "components/Home/Home.svelte";
  import { routeStore, filterSettingStore, konvaStore } from "stores";
  import Toast from "components/Toast/Toast.svelte";
  import "css/pico.css";

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
