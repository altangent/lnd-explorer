export function peerSort(a, b) {
  if (a.pub_key < b.pub_key) return -1;
  if (a.pub_key > b.pub_key) return 1;
  return 0;
}
