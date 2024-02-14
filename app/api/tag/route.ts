import { NextResponse } from 'next/server';
import prisma from "@/services/prisma"

export async function POST(request: Request) {
  console.log({ ...request })
  const payload = await request.json();
  console.log(payload)
  const newTag = await prisma.tag.create({ ...payload })
  //TODO: error handling


  return NextResponse.json(newTag, { status: 201 })
}