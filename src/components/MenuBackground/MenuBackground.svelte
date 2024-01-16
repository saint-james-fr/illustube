<script lang="ts">
  import { konvaStore } from "stores";
  import backgroundIcon from "assets/icons/background.png";

  const handleBackgroundChange = () => {
    if (!$konvaStore.bgImage || !$konvaStore.bgImage) {
      return;
    }

    // TODO : impelment this function
  };
  
</script>

<img
src={backgroundIcon}
alt="reset"
id="backgroundIcon"
on:click={handleBackgroundChange}
class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>