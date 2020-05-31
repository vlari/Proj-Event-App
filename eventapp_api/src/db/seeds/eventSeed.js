import mongoose from 'mongoose';
import chalk from 'chalk';
import env from '../../config/env';

import fs from 'fs';
import path from 'path';
import Event from '../models/event';

mongoose
  .connect(env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.log(
      chalk.red.inverse(`Error while connecting the database: ${error}`)
    );
  });

const events = JSON.parse(
  fs.readFileSync(path.join(`${__dirname}`, 'data', 'events.json'), 'utf-8')
);


Event.deleteMany().then(
  (result) => {
    console.log(chalk.blue.inverse('Data has been successfully deleted.'));
  },
  (error) => {
    console.log(chalk.red.inverse(`Error while deleting data: ${error}`));
  }
);

Event.create(events).then(
  (result) => {
    console.log(chalk.blue.inverse('Data has been successfully imported.'));
  },
  (error) => {
    console.log(chalk.red.inverse(`Error while importing data: ${error}`));
  }
);
