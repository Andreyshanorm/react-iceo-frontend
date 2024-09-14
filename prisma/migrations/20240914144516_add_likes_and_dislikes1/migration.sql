/*
  Warnings:

  - You are about to drop the column `item` on the `EmployeeDislike` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `EmployeeLike` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmployeeDislike" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "EmployeeDislike_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmployeeDislike" ("employeeId", "id") SELECT "employeeId", "id" FROM "EmployeeDislike";
DROP TABLE "EmployeeDislike";
ALTER TABLE "new_EmployeeDislike" RENAME TO "EmployeeDislike";
CREATE TABLE "new_EmployeeLike" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "EmployeeLike_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmployeeLike" ("employeeId", "id") SELECT "employeeId", "id" FROM "EmployeeLike";
DROP TABLE "EmployeeLike";
ALTER TABLE "new_EmployeeLike" RENAME TO "EmployeeLike";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
