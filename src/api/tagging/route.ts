import { NextResponse } from 'next/server';
import prisma from '@/services/prisma'

interface IParams {
  specificMysteryId: number;
  specificTagId: number
}

/**delete tag from mystery*/
export async function DELETE(request:Request, { params }: { params: IParams }) {
  const { specificMysteryId, specificTagId } = params
  const deleted = await prisma.tagging.delete({
    where: {
      mysteryId_tagId: {
        mysteryId: specificMysteryId,
        tagId: specificTagId,
      },
    },
  })
  return NextResponse.json(deleted)
};

