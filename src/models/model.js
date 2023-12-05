import { pool } from './pool.js';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES (${values})
      RETURNING id, ${columns}
    `;
    return this.pool.query(query); 
  }

  async update(columns, values, clause) {
    let query = `UPDATE ${this.table} SET `;
    for (let i = 0; i < columns.length; i += 1) {
      query += `${columns[i]} = '${values[i]}'`;
      if (i < columns.length - 1) query += ', ';
    }
    query += clause;
    query += ' RETURNING id, category, budget;';
    return this.pool.query(query);
  }

  async delete(clause) {
    const query = `DELETE FROM ${this.table}${clause}`;
    return this.pool.query(query);
  }
  
}

export default Model;