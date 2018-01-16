module.exports = function(app){
  app.get('/', function(req,res){
    var connection = app.infra.connectionFactory();
    var produtoDAO = new app.infra.ProdutosDAO(connection);

    produtoDAO.listar(function(err, data){
      if (err){
        return next(err);
      }
      res.format({
        html:function(){
          res.render('home/index',{livros:data});
        },
        default: function(){
          res.send("<h1>Accepts only HTML</h1>");
        }
      });
    });
    connection.end();
  });
};