import { RequestHandler } from "express";
import * as peopleService from '../services/people';
import { parse } from "path";
import { z } from "zod";

export const getAll: RequestHandler<{ id_event: string, id_group: string }> = async (req, res) => {
    const items = await peopleService.getAll( parseInt(req.params.id_event), parseInt(req.params.id_group) );
    if (items) return res.json({ people: items });

    return res.status(404).json({ message: "People Not found" });
}

export const getPerson: RequestHandler<{ id_event: string, id_group?: string, id?: string, cpf?: string }> = async (req, res) => {
    const item = await peopleService.getOne(
        {
            id_event: parseInt(req.params.id_event),
            id_group: parseInt(req.params.id_group ?? "0"),
            id: parseInt(req.params.id ?? "0"),
            cpf: req.params.cpf
        }
    );
    if (item) return res.json({ people: item });

    return res.status(404).json({ message: "People Not found" });
}

export const createPerson: RequestHandler<{ id_event: string, id_group: string }> = async (req, res) => {

    const addPersonSchema = z.object({
        name: z.string(),
        cpf: z.string().transform((cpf) => cpf.replace(/\.|-/gm, '')),
    });

    const body = addPersonSchema.safeParse(req.body);
    if(!body.success) return res.status(400).json({ message: "Invalid body" });

    const newPerson = await peopleService.create({
        ...body.data,
        id_event: parseInt(req.params.id_event),
        id_group: parseInt(req.params.id_group)
    });

    if (newPerson) return res.status(201).json({ people: newPerson });

    res.json({ message: "Error on create" });
}

export const updatePerson: RequestHandler<{ id_event: string, id_group: string, id: string }> = async (req, res) => {
    const updatePersonSchema = z.object({
        name: z.string().optional(),
        cpf: z.string().transform((cpf) => cpf.replace(/\.|-/gm, '')).optional(),
        matched: z.string().optional(),
    });

    const body = updatePersonSchema.safeParse(req.body);
    if(!body.success) return res.status(400).json({ message: "Invalid body" });

    const updatedPerson = await peopleService.update({
        id_event: parseInt(req.params.id_event),
        id_group: parseInt(req.params.id_group),
        id: parseInt(req.params.id)
    }, body.data);

    if (updatedPerson) {
        const personItem = await peopleService.getOne({
            id: parseInt(req.params.id),
            id_event: parseInt(req.params.id_event),
        })
        return res.json({ people: personItem })
    }

    res.json({ message: "Error on update" });
}

export const deletePerson: RequestHandler<{ id_event: string, id_group: string, id: string }> = async (req, res) => {
    const deletedPerson = await peopleService.remove({
        id_event: parseInt(req.params.id_event),
        id_group: parseInt(req.params.id_group),
        id: parseInt(req.params.id)
    });

    if (deletedPerson) return res.json({ people: deletedPerson });

    res.json({ message: "Error on delete" });
}
