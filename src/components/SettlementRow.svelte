<script>
  import { getStatus } from '../helpers';
  import Icon from '../assets/icons/report.svelte';

  export let settlement;
  export let financialEventGroupId;

  function handleClick(button) {
    console.log(`${button} button has been clicked`)
  }

  function generateTransactionLink(financialEventGroupId) {
    return `https://sellercentral.amazon.com/gp/payments-account/view-transactions.html?subview=groups&groupId=${financialEventGroupId}`;
  }
</script>

<div class="settlement-row">
  <div class="date">
    {#if financialEventGroupId}
      <a class="link" href={generateTransactionLink(financialEventGroupId)}>{settlement.startDate} - {settlement.endDate}</a>
      {:else}
        <span>{settlement.startDate} - {settlement.endDate}</span>
    {/if}
  </div>
  <div class="status">{getStatus(settlement).label(settlement)}</div>

  <div class="actions">
  {#each getStatus(settlement).buttons as button}

  <button
    disabled={!button.enabled(settlement)}
    aria-label={button.label}
    title={button.label}
    class="button {button.class}"
    on:click={() => handleClick(button.label)}
  >

    {#if button.icon}
      <svelte:component this={Icon} />
    {:else}
      {button.label}
    {/if}
  </button>

{/each}

</div>
</div>

<style>
  .settlement-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    margin-bottom: 8px;
    font-size: clamp(1rem, 1vw, 1rem);
  }
  .date {
    white-space: nowrap;
  }

  .status {
    font-style: italic;
    padding: 0 20px;
  }

  .actions {
    display: flex;
    gap: 8px;
  }
  
  .orange {
    background: orange;
  }

  .red {
    background: #FF3B30;
  }

  @media (max-width: 500px) {
    .actions {
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .date {
      white-space: initial;
    }
  }

</style>
