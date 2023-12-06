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
    it('deletes a single envelope', done => {
        const envelopeId = 1;
        server
            .delete(`${BASE_URL}/envelopes/${envelopeId}`)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.envelopes).to.be.instanceOf(Array);
                done();
            });   
    });
    it('transfers money from one envelope to another', done => {
        const data = { from: 2, to: 3, amount: 50 };
        server
            .post(`${BASE_URL}/envelopes/transfer`)
            .send(data)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                console.log(res.body)
                expect(res.body.envelopes).to.be.instanceOf(Array);
                // Default test database has envelopes with ids 1 and 2 with budgets of $500 and $100 respectively therefore
                // the expected budgets after the transfer are $450 and $150 respectively. 
                expect(res.body.envelopes[0]).to.have.property('id', data.from);
                expect(res.body.envelopes[0]).to.have.property('category', 'gas');
                expect(res.body.envelopes[0]).to.have.property('budget', '$50.00');
                expect(res.body.envelopes[1]).to.have.property('id', data.to);
                expect(res.body.envelopes[1]).to.have.property('category', 'electric');
                expect(res.body.envelopes[1]).to.have.property('budget', '$100.00');
                done();
            });
    });
});
