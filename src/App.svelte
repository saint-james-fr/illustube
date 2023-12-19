<script lang="ts">
  import Canvas from "components/Canvas/Canvas.svelte";
  import Uploader from "components/Uploader/Uploader.svelte";
  import MetaData from "components/MetaData/MetaData.svelte";
  import Positions from "components/Positions/Positions.svelte";
  import { routeStore } from "stores";
</script>

{#if $routeStore.currentRoute === "upload"}
  <Uploader />
{:else if $routeStore.currentRoute === "metadata"}
  <MetaData></MetaData>
{:else if $routeStore.currentRoute === "position"}
  <Positions />
{/if}
<Canvas />
