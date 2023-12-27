import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async (id_event: number, id_group?: number) => {
  try {
    return await prisma.event_people.findMany({ where: { id_event, id_group} });
  } catch (error) {
    return false;
  }
};

type GetOneFilter = { id_event: number, id_group?: number, id?: number, cpf?: string };
export const getOne = async (filters: GetOneFilter) => {
  try {
    if(!filters.id && !filters.cpf) return false;
    return await prisma.event_people.findFirst({ where: filters });
  } catch (error) {
    return false;
  }
};