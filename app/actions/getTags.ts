import prisma from '../services/prisma'

const getTags = async () => {
  const tags = await prisma.tag.findMany(
  );
  console.log(tags)
  return tags 
}

export default getTags