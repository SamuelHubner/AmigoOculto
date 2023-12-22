import { RequestHandler } from "express";
import * as eventService from '../services/events';
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const items = await eventService.getAll();
    if (items) return res.json({ events: items});

    res.status(404).json({ message: 'Events not found'});
}

export const getById: RequestHandler<{ id: string }> = async (req, res) => {
    const item = await eventService.getById(parseInt(req.params.id));
    if (item) return res.json({ event: item });

    res.status(404).json({ message: 'Event not found'});
}

export const createEvent: RequestHandler = async (req, res) => {
     const addEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean()
     });

     const body = addEventSchema.safeParse(req.body);
     if (!body.success) return res.json({ message: 'Dados inválidos'});

     const newEvent = await eventService.add(body.data);
     if (newEvent) return res.status(201).json({ event: newEvent });

    res.status(500).json({ message: 'Erro ao criar evento'});
}

export const updateEvent: RequestHandler<{ id: string }> = async (req, res) => {
    const updateEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean()
    });

    const body = updateEventSchema.safeParse(req.body);
    if (!body.success) return res.json({ message: 'Dados inválidos'});

    // const updatedEvent = await eventService.update(parseInt(req.params.id), body.data);
    // if (updatedEvent) return res.json({ event: updatedEvent });

    res.status(500).json({ message: 'Erro ao atualizar evento'});
}