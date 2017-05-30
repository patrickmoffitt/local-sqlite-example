CREATE TABLE "people" (
	 "person_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	 "first_name" TEXT(255,0) NOT NULL,
	 "last_name" TEXT(255,0) NOT NULL
);
CREATE INDEX "first_name_index" ON people ("first_name" COLLATE NOCASE ASC);
CREATE INDEX "last_name_index" ON people ("last_name" COLLATE NOCASE ASC);
INSERT INTO `people` VALUES (NULL, "Jango", "Reinhardt"), (NULL, "Svend", "Asmussen");
