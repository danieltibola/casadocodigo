var http = require("http");
var assert = require("assert");

describe('Endpoint /produtos', function(){
    it('#Lista produtos json', function(done){
        var configuracoes = {
            host: "localhost",
            port: 3000,
            path: "/produtos",
            headers: {
                "Accept": "application/json"
            }
        };

        http.get(configuracoes, function(res){
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers["content-type"], "application/json; charset=utf-8");
            done();
        });
    });
    it('#Lista produtos html', function(done){
        var configuracoes = {
            host: "localhost",
            port: 3000,
            path: "/produtos",
            headers: {
                "Accept": "text/html"
            }
        };

        http.get(configuracoes, function(res){
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers["content-type"], "text/html; charset=utf-8");
            done();
        });
    });
});