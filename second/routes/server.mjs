import Router from 'express';
import { getUserByID, createUser, getAllUsers, updateUser, removeUser } from '../controller/server.mjs';
const router = Router();

router.get('/', (req, res) => {
    res.send(`<div><h1>Hi there - check API: go to /api/server/</h1></div>`);
})

router.get('/api/server', getAllUsers);

router.get('/api/server/:id', getUserByID);

router.post('/api/server', createUser);

router.post('/api/server', updateUser);

router.delete('/api/server/:id', removeUser);

export default router;