import { expect, server, BASE_URL } from './setup.js'; 

describe('Envelopes', () => {
    it('gets envelopes page', done => {
        server
            .get(`${BASE_URL}/envelopes`)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.envelopes).to.be.instanceOf(Array);
                res.body.envelopes.forEach(e => {
                    expect(e).to.have.property('category');
                    expect(e).to.have.property('budget');                    
                });
                done();
            });
    });
});