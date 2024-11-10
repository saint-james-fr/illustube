<script lang="ts">
  import MenuHome from "components/MenuHome/MenuHome.svelte";
  import MenuAutomatic from "components/MenuAutomatic/MenuAutomatic.svelte";
  import MenuManual from "components/MenuManual/MenuManual.svelte";
  import MenuUploader from "components/MenuUploader/MenuUploader.svelte";
  import MenuBackground from "components/MenuBackground/MenuBackground.svelte";
  import MenuMainImage from "components/MenuMainImage/MenuMainImage.svelte";
  import MenuAI from "components/MenuAI/MenuAI.svelte";
  import MenuReset from "components/MenuReset/MenuReset.svelte";
  import MenuDownload from "components/MenuDownload/MenuDownload.svelte";

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
    <MenuMainImage />
  </div>
  <div class="menu_item_container">
    <MenuAI />
  </div>
  <div class="menu_item_container">
    <MenuReset />
  </div>
  <div class="menu_item_container">
    <MenuDownload />
  </div>
</div>

<style lang="scss">
  $icon_width: 28px;
  $margin: 2rem;

  .application_menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $background-secondary;
    height: 100%;
    width: 100%;
    gap: 1.3rem;
    border-inline: 1px solid $primary;
  }

  .menu_item_container {
    height: $icon_width;
    width: $icon_width;
    cursor: pointer;
    filter: invert(100%);

    &:has(img#downloadIcon) {
      margin-top: $margin;
    }
    &:has(img#homeIcon) {
      margin-bottom: $margin;
    }
  }
</style>
