import { RequestHandler } from "express";
import * as eventService from '../services/events';
import * as peopleService from '../services/people';
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const items = await eventService.getAll();
    if (items) return res.json({ events: items});

    res.status(404).json({ message: 'Events not found'});
    return;
}

export const getById: RequestHandler<{ id: string }> = async (req, res) => {
    const item = await eventService.getById(parseInt(req.params.id));
    if (item) return res.json({ event: item });

    res.status(404).json({ message: 'Event not found'});
    return;
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
    return;
}

export const updateEvent: RequestHandler<{ id: string }> = async (req, res) => {
    const updateEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        grouped: z.boolean().optional()
    });

    const body = updateEventSchema.safeParse(req.body);
    if (!body.success) return res.json({ message: 'Dados inválidos'});

    const updatedEvent = await eventService.update(parseInt(req.params.id), body.data);
    if (updatedEvent) {
        if (updatedEvent.status) {
            // Fazer o sorteio
            const result = await eventService.doMatches(parseInt(req.params.id));
            if (!result) return res.status(500).json({ message: 'Erro ao fazer sorteio'});
            return;
        } else {
            // limpar o sorteio
            await peopleService.update({ id_event: parseInt(req.params.id) }, { matched: ''})
        }

        return res.json({ event: updatedEvent });
    }
    

    res.status(500).json({ message: 'Erro ao atualizar evento'});
    return;
}

export const deleteEvent: RequestHandler<{ id: string }> = async (req, res) => {
    const deletedEvent = await eventService.remove(parseInt(req.params.id));
    if (deletedEvent) return res.json({ event: deletedEvent });

    res.status(500).json({ message: 'Erro ao deletar evento'});
    return;
}
