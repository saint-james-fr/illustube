<script lang="ts">
  import { konvaStore, appStore } from "stores";
  import downloadIcon from "assets/icons/download.png";
  import { exportImage } from "lib/download";
  import { toast } from "@zerodevx/svelte-toast";
  import { download } from "lib/actions";
</script>

<img
  src={downloadIcon}
  alt="download"
  id="downloadIcon"
  use:download
  class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
/>
