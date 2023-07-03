const Statuses = {
  NOT_IMPORTED: {
    label: (settlement) =>  settlement.open ? 'Open' : `$${settlement.totalAmount}` ,
    priority: 4,
    condition: (settlement) =>
     !settlement.importedAmount && !settlement.importedIgnoredAmount,
    buttons: [
      { label: 'Import', enabled: (settlement) =>  true, class: 'orange' },
      {
        label: 'Report',
        enabled: (settlement) => Boolean(settlement.importedAmount || settlement.importedIgnoredAmount),
        color: 'default',
       icon: 'assets/icons/report.svg',
      },
    ],
  },
  FULLY_IMPORTED: {
    label: (settlement) =>  `$${settlement.importedAmount}` ,
    priority: 1,
    condition: (settlement) =>
      settlement.totalAmount !== undefined &&
    settlement.importedAmount !== undefined &&
    (settlement.totalAmount === settlement.importedAmount ||
      (settlement.totalAmount === 0 && settlement.importedIgnoredAmount !== 0)),
    buttons: [
      { label: 'Import', enabled: (settlement) =>  false, class: 'disabled' },
      {
        label: 'Report',
        enabled: (settlement) => Boolean(settlement.importedAmount || settlement.importedIgnoredAmount),
        color: 'default',
        icon: 'assets/icons/report.svg',
      },
    ],
  },
  FETCHING_EVENTS: {
    label: (settlement) =>  'Fetching Refund Events',
    priority: 2,
    condition: (settlement) => settlement.isGettingRefunds || settlement.isGettingAddresses,
    buttons: [
      { label: 'Import', enabled: (settlement) =>  false, class: 'disabled' },
      {
        label: 'Report',
        enabled: (settlement) => Boolean(settlement.importedAmount || settlement.importedIgnoredAmount),
        color: 'default',
        icon: 'assets/icons/report.svg',
      },
    ],
  },
  UPGRADE: {
    label: (settlement) => 'Upgrade from Lite',
    priority: 3,
    condition: (settlement) => settlement.planUpgradeNeeded,
    buttons: [
      { label: 'Upgrade', enabled: (settlement) =>  true, class: 'red' },
      {
        label: 'Report',
        enabled: (settlement) => Boolean(settlement.importedAmount || settlement.importedIgnoredAmount),
        color: 'default',
        icon: 'assets/icons/report.svg',
      },
    ],
  },
  BUY: {
    label: (settlement) =>  'No Subscription',
    priority: 3,
    condition: (settlement) => !settlement.covered,
    buttons: [
      { label: 'Buy', enabled: (settlement) =>  true, class: 'red' },
      {
        label: 'Report',
        enabled: (settlement) => Boolean(settlement.importedAmount || settlement.importedIgnoredAmount),
        color: 'default',
       icon: 'assets/icons/report.svg',
      },
    ],
  },
  INCOMPLETE_IMPORT: {
    label: (settlement) =>  'Incomplete',
    priority: 4,
    condition: (settlement) =>
      settlement.totalAmount !== settlement.importedAmount &&
      (settlement.totalAmount !== 0 || settlement.importedIgnoredAmount !== 0),
    buttons: [
      { label: 'Import', enabled: (settlement) =>  true, class: 'orange' },
      {
        label: 'Report',
        enabled: (settlement) => Boolean(settlement.importedAmount || settlement.importedIgnoredAmount),
        color: 'default',
        icon: 'assets/icons/report.svg',
      },
    ],
  },
};

export function getStatus(settlement) {
  let selectedStatus = '';
  let highestPriority = Infinity;

  for (const status in Statuses) {
    const { condition, priority } = Statuses[status];
    if (condition(settlement) && priority < highestPriority) {
      selectedStatus = Statuses[status];
      highestPriority = priority;
    }
  }

  return selectedStatus;
}
