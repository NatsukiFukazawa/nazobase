import { TaggingFactory } from "./Tagging"
import { TagFactory } from "./Tag"
import { MysteryFactory } from "./Mystery"
import { ProfileFactory } from "./Profile"
import { ModelName } from "../../scripts/createFactory"

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

type CapitalizeUnion<T> = T extends string ? Capitalize<T> : never

type UpperCamelModelName = CapitalizeUnion<ModelName>

type createInput<T> = T extends string ? `${T}CreateInputs` : never

type CreateInputs = createInput<UpperCamelModelName>

export const Factories = [
  TaggingFactory,
  TagFactory,
  MysteryFactory,
  ProfileFactory,
]

// export const createMock = async () => {
//   await Promise.allSettled(Factories.map(async (factory) => await factory.create({})))
// }
