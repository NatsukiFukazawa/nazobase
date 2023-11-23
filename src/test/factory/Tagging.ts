import { faker } from "@faker-js/faker";
import { createFactory } from "../../scripts/createFactory";
import { Prisma, Tagging } from "@prisma/client";

export const TaggingDefaultAttributes: Prisma.TaggingCreateInput = {
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  mystery: {},
  tag: {}
};

export const TaggingFactory = createFactory<
  Prisma.TaggingCreateInput,
  Tagging
>("tagging", TaggingDefaultAttributes);
