import { faker } from "@faker-js/faker";
import { createFactory } from "../scripts/createFactory";
import { Prisma, Tag } from "@prisma/client";

export const TagDefaultAttributes: Prisma.TagCreateInput = {
  name: faker.string.sample(),
  color: faker.string.sample(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  taggings: {}
};

export const TagFactory = createFactory<
  Prisma.TagCreateInput,
  Tag
>("tag", TagDefaultAttributes);


