<script>
  import { useRegisterSW } from 'virtual:pwa-register/svelte'

  // periodic sync is disabled, change the value to enable it, the period is in milliseconds
  // You can remove onRegisteredSW callback and registerPeriodicSync function
  const period = 0

  /**
   * This function will register a periodic sync check every hour, you can modify the interval as needed.
   * @param swUrl {string}
   * @param r {ServiceWorkerRegistration}
   */
  function registerPeriodicSync(swUrl, r) {
    if (period <= 0) return

    setInterval(async () => {
      if ('onLine' in navigator && !navigator.onLine)
        return

      const resp = await fetch(swUrl, {
        cache: 'no-store',
        headers: {
          'cache': 'no-store',
          'cache-control': 'no-cache',
        },
      })

      if (resp?.status === 200)
        await r.update()
    }, period)
  }

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(swUrl, r)
      }
      else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          /** @type {ServiceWorker} */
          const sw = e.target
          if (sw.state === 'activated')
            registerPeriodicSync(swUrl, r)
        })
      }
    },
  })

  function close() {
      
      needRefresh.set(false)
  }

  let toast = $derived($needRefresh)
  let message = $derived($needRefresh ? 'New content available, click on reload button to update.' : '')
</script>

{#if toast}
  <div
    class="pwa-toast"
    role="alert"
    aria-labelledby="toast-message"
  >
    <div class="message">
      <span id="toast-message">
        { message }
      </span>
    </div>
    <div class="buttons">
      {#if $needRefresh}
        <button type="button" onclick={() => updateServiceWorker(true)}>
          Reload
        </button>
      {/if}
      <button type="button" onclick={close}>
        Close
      </button>
    </div>
  </div>
{/if}

<style>
  .pwa-toast {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 2;
    text-align: left;
    box-shadow: 3px 4px 5px 0 #8885;
    background-color: white;
  }
  .pwa-toast .message {
    margin-bottom: 8px;
  }
  .pwa-toast .buttons {
    display: flex;
  }
  .pwa-toast button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
  }
</style>
