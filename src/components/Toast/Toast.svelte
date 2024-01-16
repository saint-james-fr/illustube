<script context="module" lang="ts">
  export const errorOptions = {};
</script>

<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  const options = {
    reversed: true,
    intro: { y: 192 },
    duration: 5000,
    dismissable: false,
    icon: false,
    theme: {
      "--toastBackground": "hsl(190, 47%, 46%);",
      "--toastProgressBackground": "white",
      "--toastColor": "black",
    },
  };
</script>

<SvelteToast {options} />
