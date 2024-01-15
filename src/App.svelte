<script lang="ts">
  import Application from "components/Application/Application.svelte";
  import Hero from "components/Hero/Hero.svelte";
  import { routeStore } from "stores";
  import { fade } from "svelte/transition";
</script>

{#if $routeStore.siteRoute === "home"}
  <Hero />
{:else if $routeStore.siteRoute === "application"}
  <Application />
{/if}
