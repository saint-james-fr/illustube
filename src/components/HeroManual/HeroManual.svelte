<script lang="ts">
  import { userStore } from "stores";
  import { enterApplication } from "lib/navigation";

  const handleManualMode = (e: Event) => {
    $userStore.automaticMode = false;
    enterApplication(e);
  };
</script>

<label for="manualInput"
  ><span role="button" class="button outline">Manual Mode</span></label
>
<input id="manualInput" class="hide" type="file" on:input={handleManualMode} />

<style lang="scss">

</style>
