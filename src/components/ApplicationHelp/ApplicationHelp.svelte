<script lang="ts">
  import { appStore } from "stores";
</script>

{#if $appStore.automaticMode}
  <p>You're in <span class="automatic">automatic</span> mode. Enter manual mode to access filer settings.</p>
{/if}
<p>When hovering hover the background, use mouse scroll to zoom in and out.</p>
<p>When you're done, click on the download icon to download the image.</p>

<style lang="scss">
  p {
    font-size: 0.9rem;
    line-height: 0.8rem;
  }

  .automatic {
    color: var(--primary)
  }
</style>
