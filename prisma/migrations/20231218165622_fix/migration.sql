/*
  Warnings:

  - You are about to drop the `eventGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eventPeople` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "eventGroup" DROP CONSTRAINT "eventGroup_id_event_fkey";

-- DropForeignKey
ALTER TABLE "eventPeople" DROP CONSTRAINT "eventPeople_id_event_fkey";

-- DropForeignKey
ALTER TABLE "eventPeople" DROP CONSTRAINT "eventPeople_id_group_fkey";

-- DropTable
DROP TABLE "eventGroup";

-- DropTable
DROP TABLE "eventPeople";

-- CreateTable
CREATE TABLE "event_people" (
    "id" SERIAL NOT NULL,
    "id_event" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "event_people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_peope" (
    "id" SERIAL NOT NULL,
    "id_event" INTEGER NOT NULL,
    "id_group" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "matched" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "event_peope_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_people" ADD CONSTRAINT "event_people_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_peope" ADD CONSTRAINT "event_peope_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_peope" ADD CONSTRAINT "event_peope_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "event_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
