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
    it('posts an envelope', done => {
        const data = { category: 'clothes', budget: '150.00' };
        server
            .post(`${BASE_URL}/envelopes`)
            .send(data)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.envelopes).to.be.instanceOf(Array);
                res.body.envelopes.forEach(e => {
                    expect(e).to.have.property('id');
                    expect(e).to.have.property('category', data.category);
                    expect(e).to.have.property('budget', `\$${data.budget}`);
                });
                done();
            });
    });
    it('checks that posted envelopes have a number for budget field', done => {
        const data = { category: 'gym', budget: 'steve'};
        server
            .post(`${BASE_URL}/envelopes`)
            .send(data)
            .expect(400)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.error).to.equal('Budget must be a number.');
                done();
            });
    });
    it('gets a single envelope', done => {
        const envelopeId = 1;
        server
            .get(`${BASE_URL}/envelopes/${envelopeId}`)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.envelopes).to.be.instanceOf(Array);
                res.body.envelopes.forEach(e => {
                    expect(e).to.have.property('id', envelopeId);
                    expect(e).to.have.property('category');
                    expect(e).to.have.property('budget');
                });
                done();
            });
    });
    it('updates a single envelope', done => {
        const envelopeId = 1;
        const data = { category: 'mortgage', budget: '450.00' };
        server
            .put(`${BASE_URL}/envelopes/${envelopeId}`)
            .send(data)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.envelopes).to.be.instanceOf(Array);
                res.body.envelopes.forEach(e => {
                    expect(e).to.have.property('id', envelopeId);
                    expect(e).to.have.property('category', data.category);
                    expect(e).to.have.property('budget', `\$${data.budget}`);
                });
                done();
            });
    });
});
