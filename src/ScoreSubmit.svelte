<script lang="ts">
  const formSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log(new FormData(e.target));
  };
  const handlePlayerChange = (e: Event, player: string) => {
    const { target } = e;
    if ((target as HTMLInputElement).checked) {
      const existingIndex = selectedPlayers.findIndex((i) => i === player);
      if (existingIndex === -1) {
        selectedPlayers.push(player);
      }
    } else {
      const existingIndex = selectedPlayers.findIndex((i) => i === player);
      if (existingIndex >= 0) {
        selectedPlayers.splice(existingIndex, 1);
      }
    }
  };
  // todo(reno): this needs to be grabbed from our data store
  const possiblePlayers = ["Reno", "Nikki", "Duncan", "Robert", "Kochan"];
  const selectedPlayers = $state([]);
  $inspect(selectedPlayers);
</script>

<h1>New Score</h1>
<form onsubmit={formSubmit}>
  <label for="gameName">Game</label>
  <input type="text" name="gameName" id="gameName" required />
  <br />
  <h2>Players</h2>
  {#each possiblePlayers as player}
    <input
      type="checkbox"
      name="player{player}"
      id="player{player}"
      onchange={(e) => handlePlayerChange(e, player)}
    />
    <label for="player{player}">{player}</label>
    <br />
  {/each}
  <h2>Scores</h2>
  {#each selectedPlayers as player}
    <label for="score{player}">{player}'s Score</label>
    <input type="text" name="score{player}" id="score{player}" />
    <br />
  {/each}
  <button>Submit</button>
</form>
