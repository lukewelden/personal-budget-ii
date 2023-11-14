import { expect, server, BASE_URL, ENVELOPES_URL } from './setup.js';

describe('All envelopes page test', () => {
  it('gets envelopes url', (done) => {
    server
      .get(`${BASE_URL}/${ENVELOPES_URL}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(
          'Envelopes live here.'
        );
        done();
      });
  });
});
