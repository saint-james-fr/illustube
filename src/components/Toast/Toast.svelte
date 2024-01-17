<script context="module" lang="ts">
  export const errorOptions = {};
</script>

<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  const options = {
    reversed: true,
    intro: { y: 192 },
    pausable: true,
    duration: 300000,
    dismissable: false,
    icon: false,
    theme: {
      "--toastProgressBackground": "hsl(190, 47%, 46%)",
    },
  };
</script>

<SvelteToast {options} />
