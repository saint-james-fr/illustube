<script lang="ts">
  import { routeStore } from "stores";
  import homeIcon from "assets/icons/home.png";

  const handleHome = () => {
    $routeStore.siteRoute = "home";
  };
</script>

<img src={homeIcon} alt="home" id="homeIcon" on:click={handleHome} />


