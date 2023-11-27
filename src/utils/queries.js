export const createEnvelopesTable = `
DROP TABLE IF EXISTS envelopes;
CREATE TABLE IF NOT EXISTS envelopes (
  id SERIAL PRIMARY KEY,
  category VARCHAR,
  budget MONEY
  )
  `;

export const insertEnvelopes = `
INSERT INTO envelopes(category, budget)
VALUES ('mortgage', 500),
    ('gas', 100),
    ('electric', 50),
    ('groceries', 200),
    ('car', 250)
`;

export const dropEnvelopesTable = 'DROP TABLE envelopes';
