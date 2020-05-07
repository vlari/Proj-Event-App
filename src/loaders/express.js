import express from 'express';
import env from '../config/env';
import morgan from 'morgan';

export default function() { 
    const app = express();

    app.use(express.json());

    if (env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    return app;
}
