import { Router } from "express";
import * as auth from '../controllers/auth';
import * as event from '../controllers/events';
import * as groups from '../controllers/groups';

const router = Router();
const authenticatedRoutes = Router();

authenticatedRoutes.use(auth.validade);

authenticatedRoutes.get('/events', event.getAll);
authenticatedRoutes.get('/events/:id', event.getById);
authenticatedRoutes.post('/events', event.createEvent);
authenticatedRoutes.put('/events/:id', event.updateEvent);
authenticatedRoutes.delete('/events/:id', event.deleteEvent);

authenticatedRoutes.get('/events/:id_event/groups', groups.getAll);
authenticatedRoutes.get('/events/:id_event/groups/:id', groups.getById);
authenticatedRoutes.post('/events/:id_event/groups', groups.createGroup);

router.post('/login', auth.login);
router.use("/", authenticatedRoutes);

export default router;