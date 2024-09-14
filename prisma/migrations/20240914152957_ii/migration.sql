/*
  Warnings:

  - The primary key for the `EmployeeDislike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EmployeeLike` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmployeeDislike" (
    "ownerId" TEXT NOT NULL PRIMARY KEY DEFAULT 'temp_default_value',
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "EmployeeDislike_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmployeeDislike" ("employeeId") SELECT "employeeId" FROM "EmployeeDislike";
DROP TABLE "EmployeeDislike";
ALTER TABLE "new_EmployeeDislike" RENAME TO "EmployeeDislike";
CREATE TABLE "new_EmployeeLike" (
    "ownerId" TEXT NOT NULL PRIMARY KEY DEFAULT 'temp_default_value',
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "EmployeeLike_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmployeeLike" ("employeeId") SELECT "employeeId" FROM "EmployeeLike";
DROP TABLE "EmployeeLike";
ALTER TABLE "new_EmployeeLike" RENAME TO "EmployeeLike";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
