import { pool } from '../models/pool.js';
import {
  insertEnvelopes,
  dropEnvelopesTable,
  createEnvelopesTable,
} from './queries.js';

export const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const dropTables = () => executeQueryArray([ dropEnvelopesTable ]);
export const createTables = () => executeQueryArray([ createEnvelopesTable ]);
export const insertIntoTables = () => executeQueryArray([ insertEnvelopes ]);