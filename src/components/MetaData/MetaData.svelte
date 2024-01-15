<script lang="ts">
  import { routeStore, userStore } from "stores";

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    $routeStore.applicationRoute = "position";
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Use Metadata
    <input type="checkbox" bind:checked={$userStore.metaData.useMetaData} />
  </label>
  {#if $userStore.metaData.useMetaData}
    <label>
      <input type="checkbox" bind:checked={$userStore.metaData.showArtist} />
      Show Artist
      {#if $userStore.metaData.showArtist}
        <input
          type="text"
          bind:value={$userStore.metaData.artist}
          placeholder="Artist"
        />
      {/if}
    </label>

    <label>
      <input type="checkbox" bind:checked={$userStore.metaData.showTitle} />
      Show Title
      {#if $userStore.metaData.showTitle}
        <input
          type="text"
          bind:value={$userStore.metaData.title}
          placeholder="Title"
        />
      {/if}
    </label>

    <label>
      <input type="checkbox" bind:checked={$userStore.metaData.showAlbum} />
      Show Album
      {#if $userStore.metaData.showAlbum}
        <input
          type="text"
          bind:value={$userStore.metaData.album}
          placeholder="Album"
        />
      {/if}
    </label>

    <label>
      <input type="checkbox" bind:checked={$userStore.metaData.showYear} />
      Show Year
      {#if $userStore.metaData.showYear}
        <input
          type="text"
          bind:value={$userStore.metaData.year}
          placeholder="Year"
        />
      {/if}
    </label>

    <button type="submit">Submit</button>
  {/if}
</form>
