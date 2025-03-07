import { DBSchema, openDB } from "idb";
interface Score {
  id: number;
  game: string;
  players: string[];
  scores: { [player: string]: number };
}

interface MyDB extends DBSchema {
  scores: {
    value: Score;
    key: string;
    indexes: { 'id': string }
  }
}

const DB_VERSION = 1;

const db = await openDB<MyDB>('bgr-db', DB_VERSION, {
  upgrade(database, oldVersion, newVersion, transaction, event) {
    const scoreStore = database.createObjectStore("scores", {
      keyPath: 'id',
      autoIncrement: true,
    });
    scoreStore.createIndex('id', 'id');
    // TODO(reno): I'm not sure how exactly how indexes work, but I probably
    // want to add more.
    // scoreStore.createIndex('game', 'game');
    // scoreStore.createIndex('players', 'players');
    // scoreStore.createIndex('scores', 'scores');
  },
});

// db.version(1).stores({
//   scores: '++id, game, players, scores'
// });

export type { Score };
export { db };
