'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const colors = require('colors');

var app = express();

const port = 3001;

/* ========== LOADING ALL MONGOOSE MODELS ========== */

const mongoose = require('mongoose');
const Comment = require('./api/models/Comment');
const Person = require('./api/models/Person');
const Project = require('./api/models/Project');
const Specialization = require('./api/models/Specialization');
const Task = require('./api/models/Task');

const config = require('./config.json');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://pi2:csstv2018@ds159187.mlab.com:59187/projectdb');
mongoose.connect(`mongodb://${config.db.hostname + ":" + config.db.port}/${config.db.name}`, (err) => {
	if (err) {
		console.error(colors.red(err.message));
		process.exit(-1);
	} else {
		console.log("Successfuly connected to database".green);
		initDB();
	}
});

const auth = require('./api/controllers/authController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.passport.initialize());
app.use(auth.passport.session());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method === 'OPTIONS')
		res.sendStatus(200);
	else
		next();

});

var auth_routes = require('./api/routes/authRoutes')
auth_routes(app);

// Route for handling File updates.
var fileUpload = require('./api/routes/filesRoutes');
fileUpload(app);

var mail = require('./api/routes/mailsRoutes');
mail(app);

//var routes = require('./api/routes/todoListRoutes'); //importing route
var project_routes = require('./api/routes/projectRoutes');
project_routes(app); //register the route

var partner_routes = require('./api/routes/partnerRoutes');
partner_routes(app);

var specializationRoutes = require('./api/routes/specializationRoutes');
specializationRoutes(app);

var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

/*var adminRoutes = require('./api/routes/adminRoutes');
adminRoutes(app);*/

var comments_routes = require('./api/routes/commentsRoute')
comments_routes(app);

app.use('/static', express.static('./uploads'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err.message);
});

app.listen(port, () => {
	console.log('Server running on port 3001'.green);
});

function initDB() {
	if (Specialization.count({}, (err, count) => {
		if (err) throw err;
		if (count < 5) {
			console.log("Creating specializations");

			let IBO = new Specialization();
			IBO.name.fr = "Informatique, Big Data et Objects connectés";
			IBO.name.en = "Computer science, Big Data and IoT";
			IBO.abbreviation = "IBO";
			IBO.save();

			let NE = new Specialization();
			NE.name.fr = "Nouvelles énergies";
			NE.name.en = "New Energies";
			NE.abbreviation = "NE";
			NE.save();

			let IF = new Specialization();
			IF.name.fr = "Ingénierie Financière";
			IF.name.en = "Financial Engineering";
			IF.abbreviation = "IF";
			IF.save();

			let MNM = new Specialization();
			MNM.name.fr = "Mécanique Numérique et Modélisation";
			MNM.name.en = "Computational Mechanics and Modelling";
			MNM.abbreviation = "MNM";
			MNM.save();

			let Test = new Specialization();
			Test.name.fr = "Nom de test pour la majeur";
			Test.name.en = "Major test name";
			Test.abbreviation = "Test";
			Test.save();
		}
	}));
}