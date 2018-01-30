import { TX_NEW, TX_MARK_AS_READ } from '../constants';

export const newTxs = (state = [], { type, tx, readTxs }) => {
  switch (type) {
    case TX_NEW:
      state = state.slice();
      state.unshift(Object.assign({}, tx, { read: false }));
      break;

    case TX_MARK_AS_READ: {
      let unread = state.filter(tx => !readTxs.find(readTx => tx.tx_hash === readTx.tx_hash));
      if (unread.length !== state.length) state = unread;
      break;
    }
  }
  return state;
};
