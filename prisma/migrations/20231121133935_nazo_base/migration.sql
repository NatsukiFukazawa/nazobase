-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mystery" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Mystery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tagging" (
    "id" SERIAL NOT NULL,
    "mysteryId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "Tagging_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tagging_mysteryId_tagId_key" ON "Tagging"("mysteryId", "tagId");

-- AddForeignKey
ALTER TABLE "Mystery" ADD CONSTRAINT "Mystery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagging" ADD CONSTRAINT "Tagging_mysteryId_fkey" FOREIGN KEY ("mysteryId") REFERENCES "Mystery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagging" ADD CONSTRAINT "Tagging_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ALTER TABLE "Tagging"
--     ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE "User"
--     ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE "Tag"
--     ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE "Mystery"
--     ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;