import { NextResponse } from 'next/server';
import prisma from "@/services/prisma"
 
export async function POST(request: Request) {
  console.log(request)
  const payload = await request.json();
  const { title, description, tags,difficulty,userId, } = payload
  console.log(payload)
  const newMystery =  await prisma.mystery.create(payload)
  //TODO: error handling


  return NextResponse.json(newMystery, { status: 201 })
 }