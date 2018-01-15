var express = require("../config/express")();
var request = require("supertest")(express);

describe('#Endpoint /produtos', function(){
    it('#Listar produtos json', function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
    });
    it('#Listar produtos html', function(done){
        request.get('/produtos')
        .set('Accept','text/hml')
        .expect('Content-Type',/html/)
        .expect(200,done);
    });
});