<script lang="ts">
  import MenuUploader from "components/MenuUploader/MenuUploader.svelte";
  import MenuReset from "components/MenuReset/MenuReset.svelte";
  import MenuManual from "components/MenuManual/MenuManual.svelte";
  import MenuAutomatic from "components/MenuAutomatic/MenuAutomatic.svelte";
  import MenuBackground from "components/MenuBackground/MenuBackground.svelte";
  import MenuDownload from "components/MenuDownload/MenuDownload.svelte";
  import MenuHome from "components/MenuHome/MenuHome.svelte";

  import { userStore } from "stores";
</script>

<div class="application_menu">
  <div class="menu_item_container">
    <MenuHome />
  </div>

  {#if $userStore.automaticMode}
    <div class="menu_item_container">
      <MenuManual />
    </div>
  {:else}
    <div class="menu_item_container">
      <MenuAutomatic />
    </div>
  {/if}
  <div class="menu_item_container">
    <MenuUploader />
  </div>
  <div class="menu_item_container">
    <MenuBackground />
  </div>
  <div class="menu_item_container">
    <MenuReset />
  </div>
  <div class="menu_item_container">
    <MenuDownload />
  </div>
</div>

<style lang="scss">
  $icon_width: 30px;

  .application_menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $background-secondary;
    height: 100%;
    width: 100%;
    gap: 1.3rem;
    border-inline: 1px solid var(--primary);
  }

  .menu_item_container {
    height: $icon_width;
    width: $icon_width;
    cursor: pointer;
    filter: invert(100%);

    &:has(img#downloadIcon) {
      margin-top: 3rem;
    }
    &:has(img#homeIcon) {
      margin-bottom: 3rem;
    }
  }
</style>
