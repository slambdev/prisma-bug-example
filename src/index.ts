import { PrismaClient, Prisma } from '.prisma/client';

const prismaInclude = {
    bars: {
      include: {
        baz: true,
      },
    },
};

const fooModelWithRelations = Prisma.validator<Prisma.FooArgs>()({
  include: prismaInclude,
});

export type FooModel = Prisma.FooGetPayload<
    typeof fooModelWithRelations
>;

(async () => {
  const prisma = new PrismaClient();

  const createArgs: Prisma.FooCreateArgs & { include: typeof prismaInclude; } = {
    data: {
        name: 'test',
        version:'1.0.0',
        bars: {
            create: [
                {
                    name: 'maytheforcebewithyou',
                    bazUid: '',
                },
            ]
        },
    },
    include: prismaInclude,
  };

  // Below line gives us type errors
  const foo: FooModel = await prisma.foo.create(createArgs);

  /*
  Type 'Foo & { bars: (Bar | (Bar & { baz: Baz; }) | (Bar & { baz: Baz; }))[]; }' is not assignable to type 'Foo & { bars: (Bar & { baz: Baz; })[]; }'.
  Type 'Foo & { bars: (Bar | (Bar & { baz: Baz; }) | (Bar & { baz: Baz; }))[]; }' is not assignable to type '{ bars: (Bar & { baz: Baz; })[]; }'.
    Types of property 'bars' are incompatible.
      Type '(Bar | (Bar & { baz: Baz; }) | (Bar & { baz: Baz; }))[]' is not assignable to type '(Bar & { baz: Baz; })[]'.
        Type 'Bar | (Bar & { baz: Baz; }) | (Bar & { baz: Baz; })' is not assignable to type 'Bar & { baz: Baz; }'.
          Type 'Bar' is not assignable to type 'Bar & { baz: Baz; }'.
            Property 'baz' is missing in type 'Bar' but required in type '{ baz: Baz; }'.
   */
})().catch(console.error);