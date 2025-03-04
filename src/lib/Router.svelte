<script lang="ts">
  const { routes = [] } = $props();
  let currentPath = $state(location.pathname);

  const getCurrentPage = () => {
    console.log("getting current page...");
    let possibleRoute = routes.find((r) => r.path === currentPath);
    if (possibleRoute) {
      return possibleRoute.component;
    }
  };

  const handleClick = (e: MouseEvent) => {
    if ((e.target as Node).nodeName === "A") {
      let target = e.target as HTMLAnchorElement;
      if (target.href.startsWith(location.origin)) {
        e.preventDefault();
        history.pushState(null, "", target.href);
        currentPath = location.pathname;
      }
    }
  };

  const onPopState = (e: PopStateEvent) => {
    currentPath = location.pathname;
  };

  let currentPage = $derived.by(() => getCurrentPage());
</script>

<svelte:window onpopstate={onPopState} onclick={handleClick} />

{@render currentPage()}
