var express = require("../config/express")();
var request = require("supertest")(express);

describe('#Endpoint /produtos', function(){

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("delete from livros", function(err, data){
            if(!err){
                done();
            }
        });
    });
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
    it('#Cadastrar produto com dados inválido', function(done){
        request.post('/produtos')
        .send({titulo:'', descricao:''})
        .expect(400,done);
    });
    it('#Cadastrar produto com dados válidos', function(done){
        request.post('/produtos')
        .send({titulo:'Novo livro', descricao:'livro de teste', preco: 29.9})
        .expect(302,done);
    });
});
