-- Fix Category unique constraint: from (name) to (name, authorId)
DROP INDEX IF EXISTS "Category_name_key";
CREATE UNIQUE INDEX "Category_name_authorId_key" ON "Category"("name", "authorId");

-- Add refreshTokenHash to User for secure refresh token storage
ALTER TABLE "User" ADD COLUMN "refreshTokenHash" TEXT;
