<script lang="ts">
  import Application from "components/Application/Application.svelte";
  import Hero from "components/Hero/Hero.svelte";
  import { routeStore, userStore } from "stores";
  import Toast from "components/Toast/Toast.svelte";

  $: {console.log($userStore.image.ratio, "ratio");}
</script>

{#if $routeStore.siteRoute === "home"}
  <Hero />
{:else if $routeStore.siteRoute === "application"}
  <Application />
{/if}

<Toast />
