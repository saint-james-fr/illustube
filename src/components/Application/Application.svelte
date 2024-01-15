<script lang="ts">
  import Canvas from "components/Canvas/Canvas.svelte";
  import Uploader from "components/Uploader/Uploader.svelte";
  import MetaData from "components/MetaData/MetaData.svelte";
  import Modification from "components/Modification/Modification.svelte";
  import { applicationRouteStore } from "stores";
  import "css/pico.min.css";
</script>

<div class="application_container">
  <div class="settings_container">
    <Uploader />
    {#if $applicationRouteStore.currentRoute === "metadata"}
      <MetaData />
    {:else if $applicationRouteStore.currentRoute === "modification"}
      <Modification />
    {/if}
  </div>
  <div class="drawing_zone">
    <Canvas />
  </div>
</div>

<style lang="scss">
  .application_container {
    display: grid;
    grid-template-columns: 300px auto;
    width: 100%;
    aspect-ratio: 16 / 9;
    height: 100%;
    max-height: 940px;
  }

  .settings_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-inline: 5%;
    padding-top: 2rem;
  }
  .drawing_zone {
    background-color: $black;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
