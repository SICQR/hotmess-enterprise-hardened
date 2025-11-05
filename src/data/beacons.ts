/**
 * Mapping of QR beacon codes to their associated actions. Each entry
 * specifies a `type` indicating what should happen when the beacon is
 * scanned. The application uses these mappings to determine which
 * component or logic to run when a QR code is scanned. This object is
 * easily extendable—retailers could provide their own codes and
 * associated metadata (e.g. product IDs, event info or chat URLs).
 */
export type BeaconAction =
  | { type: 'drop'; productId: number; reward: number }
  | { type: 'ticket'; event: { name: string; date: string; price: number }; reward: number }
  | { type: 'chat'; url: string; reward: number }
  | { type: 'checkin'; reward: number };

export const beaconMappings: Record<string, BeaconAction> = {
  // Product drop beacon: scanning this awards 10 points and shows the product
  'drop-raw-tank': { type: 'drop', productId: 1, reward: 10 },
  // Event ticket beacon: scanning this awards 5 points and displays event info
  'ticket-hnh-live': {
    type: 'ticket',
    event: { name: 'HNH Live Aftercare Session', date: '2025-12-31', price: 25 },
    reward: 5,
  },
  // Chat/group join beacon: scanning this awards 2 points and links to a community
  'chat-discord': { type: 'chat', url: 'https://discord.gg/hotmess', reward: 2 },
  // Generic check-in beacon: awards 1 point for each scan
  'checkin': { type: 'checkin', reward: 1 },
};