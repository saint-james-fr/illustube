<script lang="ts">
  import Settings from "components/Settings/Settings.svelte";
  import { konvaStore } from "stores";
  // TODO : is thie component really needed ?
</script>

<Settings stage={$konvaStore.stage} img={$konvaStore.backgroundImage} />
