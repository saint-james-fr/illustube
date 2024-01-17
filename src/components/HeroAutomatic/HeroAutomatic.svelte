<script lang="ts">
  import { userStore } from "stores";
  import { enterApplication } from "lib/navigation";

  const handleAutomaticMode = (e: Event) => {
    $userStore.automaticMode = true;
    enterApplication(e);
  };
</script>

<label for="automaticInput"><span class="button shadow" role="button">automatic mode</span></label>
<input id="automaticInput" class="hide" type="file" on:input={handleAutomaticMode} />
