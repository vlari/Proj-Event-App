import loadExpress from './loaders/express';
import chalk from 'chalk';
import env from './config/env';
import loadDb from './loaders/database';

import router from './loaders/routesLoader';
import errorHandler from './routes/middleware/errorHandler';

const app = loadExpress();

// Set mongodb connection.
loadDb();

app.use('/api', router);

app.use(errorHandler);

const port = env.PORT;
app.listen(port, () => {
  console.log(chalk.green.inverse(`Server running in ${env.NODE_ENV} environment.`));
  console.log(chalk.blue.inverse(`Server running on port ${port}.`));
});
