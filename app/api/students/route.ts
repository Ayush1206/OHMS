// app/api/students/route.ts (GET)
import { NextResponse } from 'next/server';
import studentsData from '@/data/students.json';

export async function GET() {
  return NextResponse.json(studentsData);
}
