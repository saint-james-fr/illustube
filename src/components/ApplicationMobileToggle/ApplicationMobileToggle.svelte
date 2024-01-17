<script lang="ts">
  import { mobileDevice } from "lib/mobile";
  import { userStore } from "stores";

  let text: string;
  let innerWidth: number;

  let forMobile: boolean;

  $: {
    text = $userStore.showSettingMobileToggle ? "settings" : "drawing";
    forMobile = mobileDevice(innerWidth);
  }

  const toggleSettings = () => {
    userStore.update((store) => {
      store.showSettingMobileToggle = !store.showSettingMobileToggle;
      return store;
    });
  };
</script>

<svelte:window bind:innerWidth />

{#if forMobile}
  <div class="mobile_toggle">
    <button class="button outline" on:click={toggleSettings}>Show {text}</button
    >
  </div>
{/if}

<style lang="scss">
  .mobile_toggle {
    position: absolute;
    bottom: 0;
    left: calc(50% + 25px);
    transform: translateX(-50%);
    z-index: 100;
    min-width: 200px;
  }
</style>
