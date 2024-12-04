import { NextResponse } from "next/server"
import prisma from "@/services/prisma"
import getMysteryies from "@/actions/getMysteries"

export async function POST(request: Request) {
  const payload = await request.json()
  const newMystery = await prisma.mystery.create(payload)

  return NextResponse.json(newMystery, { status: 201 })
}

export async function DELETE(request: Request) {
  const json = await request.json()
  const payload = json.data
  const newMystery = await prisma.mystery.delete(payload)

  return NextResponse.json(newMystery, { status: 200 })
}

export async function GET(request: Request) {
  const mysteries = await getMysteryies()
  return NextResponse.json(mysteries, { status: 200 })
}
