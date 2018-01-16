module.exports = function(app){
  app.get('/promocoes/form', function(req, res, next){
    var connection = app.infra.connectionFactory();
    var produtoDAO = new app.infra.ProdutosDAO(connection);

    produtoDAO.listar(function(err, data){
      if(err){
        return next();
      }
      res.render('promocoes/form',{lista:data});
    });
  });
  app.post('/promocoes', function (req, res, next){
    var promocao = req.body;
    app.get('io').emit('novaPromocao', promocao);1
    res.redirect('promocoes/form');
  });
};