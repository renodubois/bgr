<script lang="ts">
  import ScoreSubmit from "./ScoreSubmit.svelte";
  import Home from "./Home.svelte";
  import Router from "./lib/Router.svelte";
  import ScoreList from "./ScoreList.svelte";
  import ScoreSubmitNew from "./ScoreSubmitNew.svelte";

  const routes = [
    { path: "/", component: Home },
    { path: "/submit", component: ScoreSubmitNew },
    { path: "/scores", component: ScoreList },
  ];
</script>

<main>
  <Router {routes} />
</main>
