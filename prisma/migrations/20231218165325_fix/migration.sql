/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventPeople` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "EventGroup_id_event_fkey";

-- DropForeignKey
ALTER TABLE "EventPeople" DROP CONSTRAINT "EventPeople_id_event_fkey";

-- DropForeignKey
ALTER TABLE "EventPeople" DROP CONSTRAINT "EventPeople_id_group_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "EventGroup";

-- DropTable
DROP TABLE "EventPeople";

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "grouped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventGroup" (
    "id" SERIAL NOT NULL,
    "id_event" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "eventGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventPeople" (
    "id" SERIAL NOT NULL,
    "id_event" INTEGER NOT NULL,
    "id_group" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "matched" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "eventPeople_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "eventGroup" ADD CONSTRAINT "eventGroup_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventPeople" ADD CONSTRAINT "eventPeople_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventPeople" ADD CONSTRAINT "eventPeople_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "eventGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
