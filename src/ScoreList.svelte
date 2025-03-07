<script lang="ts">
  import { db } from "./lib/db";

  let scores = db.getAllFromIndex("scores", "id");
  $inspect(scores);
</script>

<ul>
  {#await scores}
    <p>Loading...</p>
  {:then scores}
    {#each scores || [] as score (score.id)}
      <li>{score.game}</li>
    {/each}
  {:catch error}
    <p>Something went wrong loading scores: {error}</p>
  {/await}
</ul>
