import { PrismaClient, Prisma } from '@prisma/client';
import * as peopleService from './people';
import * as groupsService from './groups';

const prisma = new PrismaClient();

export const getAll = async () => {
   try {
        return await prisma.event.findMany();
   } catch (error) {
        return false;
   }
}

export const getById = async (id: number) => {
    try {
        return await prisma.event.findUnique({
            where: {
                id: id
            }
        });
    } catch (error) {
        return false;
    }
}

type EventsCreateData = Prisma.Args<typeof prisma.event, 'create'>['data'];
export const add = async (data: EventsCreateData) => {
     try {
          return await prisma.event.create({ data });
     } catch (error) {
          return false;
     }
}

type EventsUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data'];
export const update = async (id: number, data: EventsUpdateData) => {
    try {
        return await prisma.event.update( { where: { id }, data });
   } catch (error) {
        return false;
   }
}

export const remove = async (id: number) => {
    try {
        return await prisma.event.delete({ where: { id: id} });
    } catch (error) {
        return false;
    }
}

export const doMatches = async (id: number): Promise<boolean> => {
    const eventItem = await prisma.event.findFirst({where: {id}, select: {grouped: true}});
    if (eventItem) {
        const peopleList = await peopleService.getAll(id);
        if (peopleList) {
            let sortedList:{id:number, match:number}[] = [];
            let sortable: number [] = [];

            let attempts = 0;
            let maxAttempts = peopleList.length;
            let keepTrying = true;
            while (keepTrying && attempts < maxAttempts) {
                keepTrying = false;
                attempts++;
                sortedList = [];
                sortable = peopleList.map(item => item.id);
                
                for (let i in peopleList) {
                    let sortableFiltered: number[] = sortable;
                    if (eventItem.grouped) {
                        sortableFiltered = sortable.filter(
                            sortableItem => {
                                let sortablePerson = peopleList.find(item => item.id === sortableItem);
                                return peopleList[i].id_group !== sortablePerson?.id_group;
                            }
                         );
                    }
                }
            }

            if (attempts < maxAttempts) {
                for (let i in sortedList) {
                    await peopleService.update({
                        id: sortedList[i].id,
                        id_event: id,
                    }, {matched: ''})
                }

                return true;
            }
        }
    }
    return true;
}