import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

const filePath = path.join(process.cwd(), 'data', 'students.json');

export async function GET() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const studentsData = JSON.parse(fileData);

    const currentDate = moment();

    // Filter defaulters: feesDue > 0 and dueDate < currentDate
    const defaulters = studentsData.students.filter((student: any) => {
      const dueDate = moment(student.dueDate, 'YYYY-MM-DD');
      return student.feesDue > 0 && dueDate.isBefore(currentDate, 'day');
    });

    return NextResponse.json({ defaulters }, { status: 200 });
  } catch (error) {
    console.error('Error reading students data:', error);
    return NextResponse.json({ error: 'Error fetching defaulters' }, { status: 500 });
  }
}
