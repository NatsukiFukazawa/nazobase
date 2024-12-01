import ts from "typescript";
import fs from "fs";

const typeDefs = fs.readFileSync(
  "./node_modules/.prisma/client/index.d.ts",
  "utf8"
);

const modelName = process.argv[process.argv.length - 1];
console.log(modelName)

const outputFilename = `./src/test/factory/${modelName}.ts`;
const sourceFile = ts.createSourceFile(
  outputFilename,
  typeDefs,
  ts.ScriptTarget.Latest
);

function main() {
  let typeStr = "";
  function findTypeDef(node: ts.Node, sourceFile: ts.SourceFile) {
    if (ts.isModuleDeclaration(node) && node.name?.text === "Prisma") {
      console.log({ node })
      node.body?.forEachChild((child) => {
        console.log({ child })
        if (
          ts.isTypeAliasDeclaration(child) &&
          child.name?.escapedText === `${modelName}CreateInput`
        ) {
          typeStr = child.getText(sourceFile);
        }
      });
    }

    node.forEachChild((child) => {
      findTypeDef(child, sourceFile);
    });
  }
  findTypeDef(sourceFile, sourceFile);

  if (typeStr.length === 0) {
    console.error("該当のモデルが見つかりませんでしたYO");
    return;
  }

  const typeMap = convertTypeStringToMap(typeStr);

  const factoryFileString = generateFactoryFileString(typeMap);

  fs.writeFileSync(outputFilename, factoryFileString, "utf-8");

  console.log(`生成に成功しました！${outputFilename} をご確認ください！！`);
}

main();

type EntityMap = { key: string; type: string }[];
function convertTypeStringToMap(typeStr: string): EntityMap {
  const str = typeStr.split("=")[1].trim();
  const props = str.substring(1, str.length - 3);
  return props
    .split("\n")
    .map((keyValue: string) => ({
      key: keyValue.split(":")[0]?.trim().replace("?", ""),
      type: keyValue.split(":")[1]?.trim(),
    }))
    .filter((val) => val.key !== "__typename" && val.key !== "");
}

function dummyDataStringByType(typeStr: string) {
  switch (typeStr) {
    case "Date | string | null":
    case "Date | string":
    case "Date | null":
    case "Date":
      return "faker.date.anytime()";
    case "string":
    case "string | null":
      return "faker.string.sample()";
    case "number":
    case "number | null":
      return "faker.number.int()";
    case "boolean":
    case "boolean | null":
      return "faker.datatype.boolean()";
    default:
      return "{}";
  }
}

// Factory ファイルの文字列を生成する関数です。
function generateFactoryFileString(typeMap: EntityMap) {
  return `import faker from "@faker-js/faker";
import { createFactory } from "../../scripts/createFactory";
import { Prisma, ${modelName} } from "@prisma/client";

export const ${modelName}DefaultAttributes: Prisma.${modelName}CreateInput = {
  ${typeMap
      .map((val) => `${val.key}: ${dummyDataStringByType(val.type)}`)
      .join(",\n  ")}
};

export const ${modelName}Factory = createFactory<
  Prisma.${modelName}CreateInput,
  ${modelName}
>("${modelName.toLowerCase()}", ${modelName}DefaultAttributes);
`;
}