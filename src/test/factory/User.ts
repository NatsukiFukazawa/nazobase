// import faker from "faker";
import { faker } from "@faker-js/faker";
import { createFactory } from "../../scripts/createFactory";
import { Prisma, User } from "@prisma/client";

export const UserDefaultAttributes: Prisma.UserCreateInput = {
  email: faker.string.sample(),
  name: faker.string.sample(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  mysteries: {}
};

export const UserFactory = createFactory<
  Prisma.UserCreateInput,
  User
>("user", UserDefaultAttributes);
