import { RequestHandler } from "express";
import * as peopleService from '../services/people';
import { parse } from "path";

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