<script lang="ts">
  import { download } from "lib/actions";
</script>

<div>
  <p>
    When you're done, click <span class="primary download" use:download><strong>here</strong></span
    > or on the download icon.
  </p>
</div>

<style lang="scss">
  .download {
    cursor: pointer;
  }
</style>
