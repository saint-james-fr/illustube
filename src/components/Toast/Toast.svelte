<script context="module" lang="ts">
  export const errorOptions = {
    duration: 5000,
    dismissable: false,
    icon: true,
    theme: {
      "--toastBackground": "hsl(190, 47%, 46%);",
      "--toastProgressBackground": "white",
      "--toastColor": "black",
    },
  };
</script>

<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  const options = {
    reversed: true,
    intro: { y: 192 },
  };
</script>

<SvelteToast {options} />
