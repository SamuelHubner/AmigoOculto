import exp from "constants";
import { Router } from "express";
import * as eventsController from '../controllers/events';
import * as peopleController from '../controllers/people';

const router = Router();

router.get('/ping', (req, res) => {
    res.json( { message: 'Hello world!'});
});

router.get('/events/:id', eventsController.getById);
router.get('/events/:id_event/search', peopleController.searchPerson);

export default router;