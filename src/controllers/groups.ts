import { RequestHandler } from "express";
import * as groupsService from '../services/groups';
import { z } from "zod";

export const getAll: RequestHandler<{ id_event: string }> = async (req, res) => {
    const items = await groupsService.getAll(parseInt(req.params.id_event));
    if (items) return res.json({ groups: items});

    res.status(404).json({ message: 'Groups not found'});
}

export const getById: RequestHandler<{ id_event: string, id: string }> = async (req, res) => {
    const item = await groupsService.getById(parseInt(req.params.id_event), parseInt(req.params.id));
    if (item) return res.json({ group: item });

    res.status(404).json({ message: 'Group not found'});
}

export const createGroup: RequestHandler<{ id_event: string }> = async (req, res) => {
    const addGroupSchema = z.object({
        name: z.string()
    });

    const body = addGroupSchema.safeParse(req.body);
    if (!body.success) return res.json({ message: 'Dados inválidos'});

    const newGroup = await groupsService.add({
        id_event: parseInt(req.params.id_event),
        name: body.data.name
    });
    if (newGroup) return res.status(201).json({ group: newGroup });

   res.status(500).json({ message: 'Erro ao criar grupo'});
}

export const updateGroup: RequestHandler<{ id_event: string, id: string }> = async (req, res) => {
    const updateGroupSchema = z.object({
        name: z.string().optional()
    });

    const body = updateGroupSchema.safeParse(req.body);
    if (!body.success) return res.json({ message: 'Dados inválidos'});

    const updatedGroup = await groupsService.update(parseInt(req.params.id_event), parseInt(req.params.id), body.data);
    if (updatedGroup) return res.json({ group: updatedGroup });

    res.status(500).json({ message: 'Erro ao atualizar grupo'});
}

export const deleteGroup: RequestHandler<{ id_event: string, id: string }> = async (req, res) => {
    const deletedGroup = await groupsService.remove(parseInt(req.params.id_event), parseInt(req.params.id));
    if (deletedGroup) return res.json({ message: 'Grupo removido com sucesso'});

    res.status(500).json({ message: 'Erro ao remover grupo'});
}