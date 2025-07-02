/*
  Warnings:

  - The `category` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "categoryEnum" "Category",
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'OTHER';
