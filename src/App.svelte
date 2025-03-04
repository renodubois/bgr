<script lang="ts">
  import ScoreSubmit from "./ScoreSubmit.svelte";
  import Home from "./Home.svelte";
  import Router from "./lib/Router.svelte";

  const routes = [
    { path: "/", component: Home },
    { path: "/submit", component: ScoreSubmit },
  ];
</script>

<main>
  <Router {routes} />
</main>
