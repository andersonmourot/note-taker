const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const application = express();
const PORT = process.env.PORT || 3000;

application.use(express.json());
application.use(express.urlencoded({extended: true}));
application.use(express.static('public'));
application.use('/api', apiRoutes);
application.use('/', htmlRoutes);
