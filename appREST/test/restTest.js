const supertest = require('supertest');
const expect = require('chai').expect;
const User = require('../model');

describe('тестирование REST API', () => {
    let server;
    before((done) => {
        require('../app');
        setTimeout(() => {
            server = supertest.agent('http://localhost:3000');
            done();
        }, 1000);
    });

    describe('создание пользователя POST', () => {

        it('/api/v1/users должен вернуть корректные данные пользователя', done => {
            server
                .post('/api/v1/users')
                .type('form')
                .send({
                    'name': 'Anastasiya',
                    'score': 1
                })
                .set('charset', /UTF-8/)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.name).to.equal('Anastasiya');
                    expect(response.body.score).to.equal('1');
                    expect(response.body.id).to.not.be.undefined;
                    done();
                });
        });
        
        it('/api/v1/users должен вернуть корректные данные пользователя без параметра score', done => {
            server
                .post('/api/v1/users')
                .type('form')
                .send({
                    'name': 'Anastasiya'
                })
                .set('charset', /UTF-8/)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.score).to.be.undefined;
                    expect(response.body.name).to.equal('Anastasiya');
                    expect(response.body.id).to.not.be.undefined;
                    done();
                });
        });

        it('/api/v1/users должен вернуть корректные данные пользователя без параметра name', done => {
            server
                .post('/api/v1/users')
                .type('form')
                .send({
                    'score': 1
                })
                .set('charset', /UTF-8/)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.name).to.be.undefined;
                    expect(response.body.score).to.equal('1');
                    expect(response.body.id).to.not.be.undefined;
                    done();
                });
        });


        it('/api/v1/users должен вернуть пользователя, даже если нет параметров', done => {
            server
                .post('/api/v1/users')
                .type('form')
                .send({})
                .set('charset', /UTF-8/)
                .expect(200)
                .end((err, response) => {
                    expect(response.body.name).to.be.undefined;
                    expect(response.body.score).to.be.undefined;
                    expect(response.body.id).to.not.be.undefined;
                    done();
                });
        });

    });

    describe('удаление пользователя DELETE', () => {
        
        it('/api/v1/users/2 вернет код 200', done => {
            server
                .delete('/api/v1/users/2')
                .expect(200)
                .end((err, response) => {
                    done();
                });
        });

        it('/api/v1/users/1000 вернет код 500', done => {
            server
                .delete('/api/v1/users/1000')
                .expect(500)
                .end((err, response) => {
                    done();
                });
        });

        it('/api/v1/users вернет код 404', done => {
            server
                .delete('/api/v1/users')
                .expect(404)
                .end((err, response) => {
                    done();
                });
        });

    });

});