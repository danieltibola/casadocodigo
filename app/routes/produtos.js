module.exports = function (app){
  app.get('/produtos', function(req, res, next) {
    var connection = app.infra.connectionFactory();
    var produtoDAO = new app.infra.ProdutosDAO(connection);

    produtoDAO.listar(function(err, data){
      if (err){
        return next(err);
      }
      res.format({
        html:function(){
          res.render('produtos/lista',{lista:data});
        },
        json: function(){
          res.json(data);
        },
        default: function(){
          res.send("<h1>Accepts only HTML and JSON</h1>");
        }
      });
    });

    connection.end();

  });

  app.get('/produtos/form', function(req, res){
    res.render('produtos/form',{erros:{},produto:{}});
  });

  app.post('/produtos', function(req, res, next){
    var produto = req.body;
    
    req.assert('titulo','Titulo obrigatório').notEmpty();
    req.assert('preco','Preço deve ser numérico').isFloat();
    
    var errors = req.validationErrors();
    if(errors){
      res.format({
        html:function(){
          res.status(400).render('produtos/form',{erros:errors,produto:produto});
        },
        json: function(){
          res.status(400).json(erros);
        },
        default: function(){
          res.status(400).json(erros);
        }
      });
        return;
    }
    
    var connection = app.infra.connectionFactory();
    var produtoDAO = new app.infra.ProdutosDAO(connection);
    produtoDAO.cadastrar(produto,function(err, data){
      if(err){
        next(err);
      }
      res.redirect('/produtos');
    });

    connection.end();
  });
};