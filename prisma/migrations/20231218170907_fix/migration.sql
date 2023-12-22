/*
  Warnings:

  - You are about to drop the `event_peope` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cpf` to the `event_people` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_group` to the `event_people` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event_peope" DROP CONSTRAINT "event_peope_id_event_fkey";

-- DropForeignKey
ALTER TABLE "event_peope" DROP CONSTRAINT "event_peope_id_group_fkey";

-- AlterTable
ALTER TABLE "event_people" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "id_group" INTEGER NOT NULL,
ADD COLUMN     "matched" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "event_peope";

-- CreateTable
CREATE TABLE "event_group" (
    "id" SERIAL NOT NULL,
    "id_event" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "event_group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_group" ADD CONSTRAINT "event_group_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_people" ADD CONSTRAINT "event_people_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "event_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
