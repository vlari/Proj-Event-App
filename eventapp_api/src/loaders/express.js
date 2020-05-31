import express from 'express';
import env from '../config/env';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import sanitizer from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

export default function() { 
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    if (env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.use(sanitizer());

    app.use(helmet());

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 250
    });

    app.use(limiter);

    app.use(hpp());

    app.use(cors());

    return app;
}
