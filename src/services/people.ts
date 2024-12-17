import { PrismaClient, Prisma } from "@prisma/client";
import * as groupsService from './groups';
import exp from "constants";

const prisma = new PrismaClient();

export const getAll = async (id_event: number, id_group?: number) => {
  try {
    return await prisma.event_people.findMany({ where: { id_event, id_group} });
  } catch (error) {
    return false;
  }
  return;
};

type GetOneFilter = { id_event: number, id_group?: number, id?: number, cpf?: string };
export const getOne = async (filters: GetOneFilter) => {
  try {
    if(!filters.id && !filters.cpf) return false;
    return await prisma.event_people.findFirst({ where: filters });
  } catch (error) {
    return false;
  }
  return;
};

type PeopleCreateData = Prisma.Args<typeof prisma.event_people, 'create'>['data']
export const create = async (data: PeopleCreateData) => {
    try {
        if (!data.id_group) return false;

        const group = await groupsService.getById(data.id_event, data.id_group)
        if (!group) return false;

        return await prisma.event_people.create({ data });
    } catch (error) {
        return false;
    }
    return;
}

type PeopleUpdateData = Prisma.Args<typeof prisma.event_people, 'update'>['data']
type UpdateFilters = { id?: number; id_event: number; id_group?: number;}
export const update = async (filters: UpdateFilters, data: PeopleUpdateData) => {
    try {
        return await prisma.event_people.updateMany({ where: filters, data });
    } catch (error) {
        return false;
    }
    return;
}

type DeleteFilters = { id: number; id_event?: number; id_group?: number;}
export const remove = async (filters: DeleteFilters) => {
    try {
        return await prisma.event_people.delete({ where: filters });
    } catch (error) {
        return false;
    }
    return;
}
