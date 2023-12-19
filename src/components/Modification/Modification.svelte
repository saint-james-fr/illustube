<script lang="ts">
  import Settings from "components/Settings/Settings.svelte";
  import { konvaStore } from "stores";
</script>

<Settings stage={$konvaStore.stage} img={$konvaStore.backgroundImage} />
