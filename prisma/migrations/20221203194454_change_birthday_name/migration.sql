/*
  Warnings:

  - You are about to drop the column `dataNasc` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `dataNascimento` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "dataNasc",
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL;
