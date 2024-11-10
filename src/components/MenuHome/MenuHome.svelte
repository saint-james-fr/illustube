<script lang="ts">
  import { routeStore } from "stores";
  import homeIcon from "assets/icons/home.png";
  import { tippy } from "svelte-tippy";

  const handleHome = () => {
    $routeStore.siteRoute = "home";
  };
</script>

<span
  use:tippy={{
    content: "HOME",
    placement: "right",
    animation: "perspective-subtle",
  }}
>
  <img src={homeIcon} alt="home" id="homeIcon" on:click={handleHome} />
</span>
