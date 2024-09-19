// app/api/updateFee/route.ts (POST)
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import studentsData from '@/data/students.json';

export async function POST(request: Request) {
  const body = await request.json();
  const { id, feesPaid, feesDue } = body;

  // Find student by ID
  const studentIndex = studentsData.students.findIndex((student: { id: any; }) => student.id === id);
  if (studentIndex === -1) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  // Update the student's feesPaid and feesDue
  studentsData.students[studentIndex].feesPaid = feesPaid;
  studentsData.students[studentIndex].feesDue = feesDue;

  // Save updated data back to JSON file
  const filePath = path.join(process.cwd(), 'data', 'students.json');
  fs.writeFileSync(filePath, JSON.stringify(studentsData, null, 2));

  return NextResponse.json({ message: 'Fees updated successfully' });
}
