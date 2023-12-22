import exp from "constants";
import { Router } from "express";

const router = Router();

router.get('/ping', (req, res) => {
    res.json( { message: 'Hello world!'});
});

export default router;