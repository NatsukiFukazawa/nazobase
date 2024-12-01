// import faker from "faker";
import { faker } from "@faker-js/faker"
import { createFactory } from "../../scripts/createFactory"
import { Prisma, Mystery } from "@prisma/client"

export const MysteryDefaultAttributes: Prisma.MysteryCreateInput = {
  title: faker.string.sample(),
  imageUrl: faker.string.sample(),
  difficulty: faker.number.int(),
  explanation: faker.string.sample(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  answer: faker.string.sample(),
  profile: {},
  tags: {},
}

export const MysteryFactory = createFactory<Prisma.MysteryCreateInput, Mystery>(
  "mystery",
  MysteryDefaultAttributes
)
