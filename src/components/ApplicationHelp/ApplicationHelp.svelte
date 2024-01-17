<script lang="ts">
  import {userStore } from "stores";
</script>

<p>When hovering on the background image, scroll to resize.</p>
{#if $userStore.automaticMode}
  <p>
    You're in <span class="primary"><strong>automatic</strong></span> mode. Enter manual mode to access
    more features.
  </p>
{/if}
