import express from 'express';

import {
    signUp,
    login,
    getAccountUser,
    recoverPassword,
    resetPassword,
    patchPassword
} from './controllers/sessionController';
import { guard } from './middleware/auth';

const router = express.Router();

router.post('/account/signup', signUp);
router.post('/account/login', login);
router.get('/account/user', guard, getAccountUser);
router.post('/account/password/change', guard, patchPassword);
router.post('/account/password/recover', recoverPassword);
router.post('/account/password/reset', resetPassword);

export default router;
