<script lang="ts">
  let {
    players,
    scores = $bindable(),
    activeSection = $bindable(),
  }: { players: any[]; scores: any; activeSection: any } = $props();
  let onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const players = formData
      .keys()
      .filter((v) => v.includes("player"))
      .map((v) => v.slice("player".length))
      .toArray();
    activeSection = "WinnerSelect";
  };
</script>

<form onsubmit={onSubmit}>
  {#each players as player}
    <input
      name="player{player}"
      id="player{player}"
    />
    <label for="player{player}">{player}</label>
    <br />
  {/each}
  <input type="submit" value="Next" />
</form>
