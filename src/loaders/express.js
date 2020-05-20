import express from 'express';
import env from '../config/env';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import sanitizer from 'express-mongo-sanitize';

export default function() { 
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    if (env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.use(sanitizer());

    return app;
}
