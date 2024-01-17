<script lang="ts">
  import {userStore } from "stores";
</script>

<p>When hovering hover the background, use mouse scroll to zoom in and out.</p>
{#if $userStore.automaticMode}
  <p>
    You're in <span class="primary"><strong>automatic</strong></span> mode. Enter manual mode to access
    various settings.
  </p>
{/if}
