-- CreateTable
CREATE TABLE "Foo" (
    "uid" TEXT NOT NULL,
    "creationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "Foo_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Bar" (
    "uid" TEXT NOT NULL,
    "bazUid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fooUid" TEXT,

    CONSTRAINT "Bar_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Baz" (
    "uid" TEXT NOT NULL,
    "creationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "Baz_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Foo_name_version_key" ON "Foo"("name", "version");

-- CreateIndex
CREATE UNIQUE INDEX "Baz_name_version_key" ON "Baz"("name", "version");

-- AddForeignKey
ALTER TABLE "Bar" ADD CONSTRAINT "Bar_bazUid_fkey" FOREIGN KEY ("bazUid") REFERENCES "Baz"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bar" ADD CONSTRAINT "Bar_fooUid_fkey" FOREIGN KEY ("fooUid") REFERENCES "Foo"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
