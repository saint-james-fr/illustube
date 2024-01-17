<script lang="ts">
  import Canvas from "components/Canvas/Canvas.svelte";
  import Settings from "components/Settings/Settings.svelte";
  import ApplicationMenu from "components/ApplicationMenu/ApplicationMenu.svelte";
  import ApplicationHelp from "components/ApplicationHelp/ApplicationHelp.svelte";
  import SettingsDownload from "components/SettingsDownload/SettingsDownload.svelte";
  import ApplicationMobileToggle from "components/ApplicationMobileToggle/ApplicationMobileToggle.svelte";
  import { userStore } from "stores";

  let showSettingMobileToggle: boolean;
  $: {
    showSettingMobileToggle = $userStore.showSettingMobileToggle;
  }
</script>

<div class="page_container">
  <div class="application_container">
    <div class="menu_container">
      <ApplicationMenu />
    </div>
    <div class="settings_container">
      <ApplicationHelp />
      <Settings />
      <SettingsDownload />
    </div>
    <div class="drawing_container" class:showSettingMobileToggle>
      <Canvas />
    </div>
    <ApplicationMobileToggle />
  </div>
</div>

<style lang="scss">
  .application_container {
    display: grid;
    grid-template-columns: 50px 300px auto;
    width: 100%;
    height: 100vh;

    @include until($breakpoint) {
      grid-template-columns: 50px calc(100% - 50px) calc(100% - 50px);
    }
  }

  .settings_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-inline: 10%;
    background: $background-secondary;
    border-right: 1px solid var(--primary);
    @include until($breakpoint) {
      border-right: none;
    }
  }
  .drawing_container {
    background-color: $black;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    @include from($lg) {
      border-right: 1px solid $primary
    }
  }

  .showSettingMobileToggle {
    @include until($breakpoint) {
      transform: translateX(-100%);
    }
  }
</style>
