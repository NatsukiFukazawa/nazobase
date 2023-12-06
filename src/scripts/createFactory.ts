import { PrismaClient } from "@prisma/client";
import prisma from '@/services/prisma'


type FilterStartsWith<
  Union,
  Prefix extends string
> = Union extends `${Prefix}${infer _Property}` ? never : Union;
export type ModelName = FilterStartsWith<keyof Awaited<PrismaClient>, "$">;

/**
 * connect/create が生えてたら　include できるようにする
 */
function buildPrismaIncludeFromAttrs(attrs: Record<string, any>) {
  const include = Object.keys(attrs).reduce((prev, curr) => {
    const value = attrs[curr];
    const isObject = typeof value === "object";
    const isRelation =
      isObject && Object.keys(value).find((v) => v.match(/connect|create/));

    if (isRelation) {
      prev[curr] = true;
    }

    return prev;
  }, Object.create(null));

  const hasInclude = Object.keys(include).length;
  return hasInclude ? include : undefined;
}

// ここでモデル名とデフォルトの値を渡すと、それに基づいた Factory 関数を返します。
export const createFactory = <CreateInputType, ModelType>(
  modelName: ModelName,
  defaultAttributes: CreateInputType
) => {
  return {
    create: async (attrs: Partial<CreateInputType>): Promise<ModelType> => {
      const obj: CreateInputType = {
        ...defaultAttributes,
        ...attrs,
      };

      const options: Record<string, any> = {};
      const includes = buildPrismaIncludeFromAttrs(attrs);
      if (includes) options.include = includes;


      // 型力が足りなかったので妥協しました。猛者を求む
      const specificDelegate = prisma[modelName as keyof PrismaClient] as any
      return await specificDelegate.create({
        data: { ...obj },
        ...options,
      });
    },
  };
};