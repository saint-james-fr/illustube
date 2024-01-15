<script lang="ts">
  import Canvas from "components/Canvas/Canvas.svelte";
  import Uploader from "components/Uploader/Uploader.svelte";
  import MetaData from "components/MetaData/MetaData.svelte";
  import Modification from "components/Modification/Modification.svelte";
  import { routeStore } from "stores";
  import "css/pico.css";
</script>

<div class="page_container">
  <div class="application_container">
    <div class="settings_container">
      <Uploader />
      {#if $routeStore.applicationRoute === "metadata"}
        <MetaData />
      {:else if $routeStore.applicationRoute === "modification"}
        <Modification />
      {/if}
    </div>
    <div class="drawing_zone">
      <Canvas />
    </div>
  </div>
</div>

<style lang="scss">
  .application_container {
    display: grid;
    grid-template-columns: 300px auto;
    width: 100%;
    height: 100vh;
    max-height: 940px;
  }

  .settings_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-inline: 10%;
    padding-top: 2rem;
    background: $secondary;
  }
  .drawing_zone {
    background-color: $black;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
