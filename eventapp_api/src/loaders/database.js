import mongoose from 'mongoose';
import env from '../config/env';
import chalk from 'chalk';

const connection = async () => {
    const connection = await mongoose.connect(
        env.DB_URI,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
    );

    console.log(chalk.blue.bold(`Database connection succesful on host: ${connection.connection.host}`));
}

export default connection;
