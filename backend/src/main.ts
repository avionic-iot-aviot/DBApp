import * as express from 'express';
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


// -----  API che gestisce le richieste di tipo dns  ----- \\
const pubApiLeasesRoute = require('./routes/leasesRoutes');
app.use('/leases', pubApiLeasesRoute);

const pubApiFrontendRoute = require('./routes/frontendRoutes');
app.use('/frontend', pubApiFrontendRoute);

app.listen(4000,'0.0.0.0',() => {
  console.log('Application listening on port 4000!');
});

module.exports = app;
