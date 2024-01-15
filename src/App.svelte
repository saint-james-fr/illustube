<script lang="ts">
  import Canvas from "components/Canvas/Canvas.svelte";
  import Uploader from "components/Uploader/Uploader.svelte";
  import MetaData from "components/MetaData/MetaData.svelte";
  import Modification from "components/Modification/Modification.svelte";
  import { routeStore } from "stores";
  import "css/pico.min.css";
</script>

<div class="app_container">
  <div class="settings_container">
    <Uploader />
    {#if $routeStore.currentRoute === "metadata"}
      <MetaData />
    {:else if $routeStore.currentRoute === "modification"}
      <Modification />
    {/if}
  </div>
  <div class="drawing_zone">
    <Canvas />
  </div>
</div>

<style lang="scss">
  .app_container {
    display: grid;
    grid-template-columns: 300px auto;
    width: 100vw;
    height: 100vh;
  }

  .settings_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center ;
    padding-inline: 5%;
    padding-top: 2rem;
  }
  .drawing_zone {
    background-color: $black;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
