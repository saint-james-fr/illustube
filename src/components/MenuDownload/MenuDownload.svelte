<script lang="ts">
  import { konvaStore, appStore } from "stores";
  import downloadIcon from "assets/icons/download.png";
  import { download } from "lib/actions";
  import { tippy } from "svelte-tippy";
  
</script>

<span
  use:tippy={{
    content: "DOWNLOAD FILE",
    placement: "right",
    animation: "perspective-subtle",
  }}
>
  <img
    src={downloadIcon}
    alt="download"
    id="downloadIcon"
    use:download
    class:gray={!$konvaStore.bgImage || !$konvaStore.bgImage}
  />
</span>
