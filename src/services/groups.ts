import { PrismaClient, Prisma } from '@prisma/client';
import exp from 'constants';
import e from 'express';
const prisma = new PrismaClient();

export const getAll = async (id_event: number) => {
    try {
        return await prisma.event_group.findMany({ where : { id_event } });
    } catch (error) {
        return false;
    }
}

export const getById = async (id_event: number, id: number) => {
    try {
        return await prisma.event_group.findFirst({ where : { id_event, id } });
    } catch (error) {
        return false;
    }
}

type GroupsCreateData = Prisma.Args<typeof prisma.event_group, 'create'>['data'];
export const add = async (data: GroupsCreateData) => {
    try {
        if (!data.id_event) return false;

        const event = await prisma.event.findFirst({ where: { id: data.id_event } });
        if (!event) return false;

        return await prisma.event_group.create({ data });
    } catch (error) {
        return false;
    }
}

type GroupsUpdateData = Prisma.Args<typeof prisma.event_group, 'update'>['data'];
export const update = async (id_event: number, id: number, data: GroupsUpdateData) => {
    try {
        return await prisma.event_group.update({ where: { id_event, id }, data });
    } catch (error) {
        return false;
    }
}

export const remove = async (id_event: number, id: number) => {
    try {
        return await prisma.event_group.delete({ where: { id_event, id } });
    } catch (error) {
        return false;
    }
}	