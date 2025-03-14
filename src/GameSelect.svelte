<script lang="ts">
  let { game = $bindable(), activeSection = $bindable() } = $props();
  let onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    game = formData.get("game");
    activeSection = "PlayerSelect";
  };
</script>

<form onsubmit={onSubmit}>
  <label for="game">Game</label>
  <input name="game" id="game" required />
  <input type="submit" value="Next" />
</form>
