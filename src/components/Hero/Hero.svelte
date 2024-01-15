<script lang="ts">
  import { appStore, routeStore } from "stores";
  import { upload } from "lib/upload";

  const enterApplication = (e: Event) => {
    $routeStore.siteRoute = "application";
    const files = (e.target as HTMLInputElement).files;
    if (files) upload(files);
  };

  const handleManualMode = (e: Event) => {
    $routeStore.siteRoute = "application";
    enterApplication(e);
  };

  const handleAutomaticMode = (e: Event) => {
    $appStore.automaticMode = true;
    enterApplication(e);
  };
</script>

<div class="hero">
  <div class="mycontainer">
    <div class="fullheight">
      <div class="hero_element">
        <h1>Video backgrounds made easy</h1>
        <p>
          Generate thumbnails and background for your youtube uploads in a
          breeze.<br />Free and easy.
        </p>
        <div class="hero_buttons">
          <label for="manualInput"><span role="button">Get started</span></label
          >
          <input id="manualInput" type="file" on:input={handleManualMode} />
          <label for="automaticInput"
            ><span role="button">automatic mode</span></label
          >
          <input
            id="automaticInput"
            type="file"
            on:input={handleAutomaticMode}
          />
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

  span[role="button"] {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .hero_buttons {
    display: flex;
    width: 50%;
    justify-content: space-between;
    gap: 2rem;
  }

  #automaticInput,
  #manualInput {
    display: none;
  }
</style>
