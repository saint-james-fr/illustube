<script lang="ts">
  import Application from "components/Application/Application.svelte";
  import Hero from "components/Hero/Hero.svelte";
  import { routeStore } from "stores";
  import Toast from "components/Toast/Toast.svelte";
</script>

{#if $routeStore.siteRoute === "home"}
  <Hero />
{:else if $routeStore.siteRoute === "application"}
  <Application />
{/if}

<Toast />
