-- AlterTable
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_pkey" PRIMARY KEY ("todoId");

-- DropIndex
DROP INDEX "Todos_todoId_key";
