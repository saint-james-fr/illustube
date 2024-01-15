<script lang="ts">
  import Application from "components/Application/Application.svelte";
  import Hero from "components/Hero/Hero.svelte";
</script>

<div class="page_container">
  <Hero />
  <Application />
</div>

<style lang="scss">
  .page_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    margin: 0 auto;
    max-width: 1440px;
  }
</style>
