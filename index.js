var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var formidable=require('formidable');
var session=require('express-session');
var crypto=require('crypto');
var fs=require('fs');
var app = express(); //Creeare server

app.use(session({
	secret: "parola_sesiune",
	resave:true,
	saveUninitialized:false
})) // o sa apara campul session in request: req.session care va fi acelasi obiect pentru toate requesturile

// pentru folosirea ejs-ului
app.set('view engine', 'ejs');

app.use(express.static(path.join( __dirname, "resurse")));
// cand se face o cerere get catre pagina de index

//---------------tratare cereri post------------------
//<form method="post" action="/register"
app.post("/register", function(req,res){
	//preiau obiectul de tip formular
	var form=new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){

		//proprietatile din fields sunt valorile atributelor name din inputurile formularului
		var continutFisier= fs.readFileSync("useri.json")
		var obUseri=JSON.parse(continutFisier);
		var parolaCriptata;
		var algoritmCriptare= crypto.createCipher("aes-128-cbc", "cheie_pentru_criptare");
		parolaCriptata=algoritmCriptare.update(fields.password, "utf8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex")
		var userNou={
      id:obUseri.lastId,
      nume:fields.nume,
      prenume:fields.prenume,
      email:fields.email,
			sex:fields.gender,
      parola:parolaCriptata,
      dataInreg: new Date(),
      rol:"user",
		}
		obUseri.lastId += 1;
		obUseri.useri.push(userNou);
		var jsonNou=JSON.stringify(obUseri);
		fs.writeFileSync("useri.json", jsonNou);
		res.redirect("/index");
	})
});


app.post("/login", function(req,res){
	//preiau obiectul de tip formular
	var form=new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){

		//proprietatile din fields sunt valorile atributelor name din inputurile formularului
		var continutFisier= fs.readFileSync("useri.json");
		var obUseri=JSON.parse(continutFisier);
		var parolaCriptata;
		var algoritmCriptare= crypto.createCipher("aes-128-cbc", "cheie_pentru_criptare");
		parolaCriptata=algoritmCriptare.update(fields.password, "utf-8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex")

		//find returneaza primul element pentru care functia data ca parametru returneaza true (e indeplinita conditia de cautare)
		//daca nu gaseste un element cu conditia ceruta returneaza null
		var utiliz = obUseri.useri.find(function(el){
			return el.email == fields.email && el.parola == parolaCriptata;
		});

		if(utiliz){
			console.log("exista utilizatorul!")
			req.session.utilizator=utiliz;

			//parametrul al doilea al lui render  contine date de transmis catre ejs
			res.render("html/myaccount");
		}



	})
});



// ------- tratare cereri get--------------------
/*
app.get("/logout", function(req,res){
	req.session.destroy();
	res.redirect("/");
})
*/
app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index');
});
/*
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
*/
app.get("/*",function(req, res){
	//err este null daca randarea s-a terminat cu succes, si contine eroarea in caz contrar (a survenit o eroare)
	//rezRandare - textul in urma randarii (compilarii din ejs in html)
  console.log(req.url);
  res.render("html"+req.url, function(err, rezRandare){
		if (err){
			if(err.message.includes("Failed to lookup view")){
				res.status(404).render("html/404");
			}
			else{
				throw err;
			}
		}
		else{
			res.send(rezRandare);
		}
	});
})
app.use(function(req, res){
	res.status(404).render("html/404");
})


app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');
