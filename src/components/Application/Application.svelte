<script lang="ts">
  import Canvas from "components/Canvas/Canvas.svelte";
  import Settings from "components/Settings/Settings.svelte";
  import { routeStore } from "stores";
  import "css/pico.css";
  import ApplicationMenu from "components/ApplicationMenu/ApplicationMenu.svelte";
</script>

<div class="page_container">
  <div class="application_container">
    <div class="menu_zone">
      <ApplicationMenu />
    </div>
    <div class="settings_container">
      {#if $routeStore.applicationRoute === "settings"}
        <Settings />
      {/if}
    </div>
    <div class="drawing_container">
      <Canvas />
    </div>
  </div>
</div>

<style lang="scss">
  .application_container {
    display: grid;
    grid-template-columns: 50px 300px auto ;
    width: 100%;
    height: 100vh;
    overflow: hidden;
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
  .drawing_container {
    background-color: $black;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
</style>
