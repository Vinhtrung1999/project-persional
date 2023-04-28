const express = require('express');
const app = express();
const { serverConfig } = require('./src/services/config');
const session = require('express-session')
const routes = require('./routes');
const cors = require('cors')
//set
app.set('view engine', 'ejs');

//use
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "final" }));

routes(app);

app.listen(serverConfig, () => console.log(`
-----------------------------------------------------------------------
    API server running at: http://localhost:${serverConfig.port}
    Runtime environment: ${serverConfig.environment}
-----------------------------------------------------------------------
`));