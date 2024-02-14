import { NextResponse } from 'next/server';
import prisma from "@/services/prisma"

export async function POST(request: Request) {
  const payload = await request.json();
  if(payload.data){
    const newTags = await prisma.tag.createMany(payload)
    return NextResponse.json(newTags, { status: 201 })
  }
  const newTag = await prisma.tag.create({ ...payload })

  return NextResponse.json(newTag, { status: 201 })
}


export async function DELETE(request: Request) {
  const json = await request.json();
  const payload = json.data
  const result =  await prisma.tag.delete(payload)

  return NextResponse.json(result, { status: 200 })
 }