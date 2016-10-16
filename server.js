import path from 'path';
import express from 'express';
import http from 'http';
import reload from 'reload';
import bodyParser from 'body-parser';
import logger from 'js-logger';

logger.useDefaults();

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

reload(server, app);

server.listen(app.get('port'), () => {
  logger.info(`Server started: http://localhost: ${app.get('port')}/`);
});
