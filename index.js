var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var app = express();//createServer

// pentru folosirea ejs-ului
app.set('view engine', 'ejs');

app.use(express.static(path.join( __dirname, "resurse")));
// cand se face o cerere get catre pagina de index
app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index');
});
app.get('/test', function(req,res){
  res.render('html/test');
});
app.get('/about', function(req,res){
  res.render('html/about');
});
app.get('/contact', function(req,res){
  res.render('html/contact');
});
app.get('/login', function(req,res){
  res.render('html/login');
});
app.get('/myaccount',function(req,res){
  res.render('html/myaccount');
});
app.get('/products', function(req,res){
  res.render('html/products');
});
app.get('/register', function(req,res){
  res.render('html/register');
});
app.get('/ceva', function(req, res) {
	console.log("whatever")
	//<link type="image/x-icon"
	res.setHeader("Content-Type", "text/html");
	res.write("<html><body>");
	//if(....)
	res.write("<p>Ce mai faci?</p></body></html>");
	res.end();
});
app.use(function(req, res){
	res.status(404).render("html/404");
})

app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');
