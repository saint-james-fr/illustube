<script>
  import HeroAutomatic from "components/HeroAutomatic/HeroAutomatic.svelte";
  import HeroManual from "components/HeroManual/HeroManual.svelte";
</script>

<div class="hero">
  <div class="mycontainer">
    <div class="fullheight">
      <div class="hero_element">
        <h1>Video backgrounds made easy</h1>
        <p>
          Generate thumbnails and background for your video uploads in a breeze.<br
          />Free and easy.
        </p>
        <div class="hero_buttons">
          <HeroAutomatic />
          <HeroManual />
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  h1 {
    text-align: center;
  }
  .hero {
    height: 100vh;
    min-height: 100vh;
    width: 100%;
  }

  .fullheight {
    height: 100%;
  }

  .hero_element {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
      font-weight: bold;
      text-align: center;
    }
  }

  .hero_buttons {
    margin-top: 3rem;
    display: flex;
    width: 50%;
    justify-content: space-between;
    gap: 2rem;
  }
</style>
