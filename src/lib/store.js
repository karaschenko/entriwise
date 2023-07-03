import { writable } from 'svelte/store';

export const settlementsData = writable([
  {
    path: '../mocks/settlements-reports1.json',
    isLoading: true,
    showLoadingPlaceholders: true,
    settlementData: [],
    pendingCount: 0,
  },
  {
    path: '../mocks/settlements-reports2.json',
    isLoading: true,
    showLoadingPlaceholders: true,
    settlementData: [],
    pendingCount: 0,
  }
]);
