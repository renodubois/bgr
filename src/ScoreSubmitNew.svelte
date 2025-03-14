<script lang="ts">
  import GameSelect from "./GameSelect.svelte";
  import { db } from "./lib/db";
  import PlayerScoreEntry from "./PlayerScoreEntry.svelte";
  import PlayerSelect from "./PlayerSelect.svelte";
  import WinnerSelect from "./WinnerSelect.svelte";

  let game = $state("");
  let players = $state([]);
  let scores = $state({});
  let winners = $state([]);
  let activeFormSection = $state("GameSelect");

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      // TODO(reno): Yelling about not specifying ID here, but it isn't needed because of
      // auto-increment. Figure out how to fix the types in `db.ts` to make that not error.
      const id = await db.add("scores", {
        game,
        players,
        scores,
        winners,
      });
    } catch (err) {
      console.error("Failed to add: ", err);
    }
  };

  $inspect(game);
  $inspect(activeFormSection);
</script>

{#if activeFormSection == "GameSelect"}
  <GameSelect bind:game bind:activeSection={activeFormSection} />
{:else if activeFormSection == "PlayerSelect"}
  <PlayerSelect bind:players bind:activeSection={activeFormSection} />
{:else if activeFormSection == "PlayerScoreEntry"}
  <PlayerScoreEntry
    {players}
    bind:scores
    bind:activeSection={activeFormSection}
  />
{:else if activeFormSection == "WinnerSelect"}
  <WinnerSelect
    {players}
    {scores}
    bind:winners
    bind:activeSection={activeFormSection}
  />
{:else if activeFormSection == "Submit"}
  <form onsubmit={handleSubmit}>
    <p>Review of score here!</p>
    <input type="submit" value="Save" />
  </form>
{/if}
