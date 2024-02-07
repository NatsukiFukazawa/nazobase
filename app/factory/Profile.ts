// import faker from "faker";
import { faker } from "@faker-js/faker";
import { createFactory } from "../scripts/createFactory";
import { Prisma, Profile } from "@prisma/client";

export const ProfileDefaultAttributes: Prisma.ProfileCreateInput = {
  email: faker.string.sample(),
  userId: faker.string.sample(),
  name: faker.string.sample(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  mysteries: {}
};

export const ProfileFactory = createFactory<
  Prisma.ProfileCreateInput,
  Profile
>("profile", ProfileDefaultAttributes);
