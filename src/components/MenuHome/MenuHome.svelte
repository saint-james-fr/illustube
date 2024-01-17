<script lang="ts">
  import { routeStore } from "stores";
  import homeIcon from "assets/icons/home.png";
  import { tooltip } from "@svelte-plugins/tooltips";
  import { onMount } from "svelte";

  const handleHome = () => {
    $routeStore.siteRoute = "home";
  };

  onMount(() => {
    const tooltip = document.querySelector(".tooltip") as HTMLElement;
    if (tooltip) {
      tooltip.style.inset = "0";
    }
  });
</script>

<span
  title="Home"
  use:tooltip={{
    position: "right",
    animation: "slide",
    action: "hover",
  }}
>
  <img src={homeIcon} alt="home" id="homeIcon" on:click={handleHome} />
</span>
