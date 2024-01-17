<script context="module" lang="ts">
  export const errorOptions = {};
</script>

<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  const options = {
    reversed: true,
    intro: { y: 192 },
    pausable: true,
    duration: 3000,
    dismissable: false,
    icon: false,
    theme: {
      "--toastBackground": "white;",
      "--toastProgressBackground": "hsl(190, 47%, 46%)",
      "--toastColor": "hsl(190, 47%, 46%)",
    },
  };
</script>

<SvelteToast {options} />
