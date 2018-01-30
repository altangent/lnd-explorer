import { TX_NEW, TX_MARK_AS_READ } from '../constants';

export const newTx = tx => ({
  type: TX_NEW,
  tx,
});

export const markAsRead = readTxs => ({
  type: TX_MARK_AS_READ,
  readTxs,
});
