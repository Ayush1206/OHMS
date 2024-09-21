import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Define the paths for classes.json and feeStructure.json
const classesFilePath = path.join(process.cwd(), 'data', 'classes.json');
const feeStructureFilePath = path.join(process.cwd(), 'data', 'feeStructure.json');

// GET: Fetch class list from classes.json
export async function GET() {
  try {
    // Read classes data
    const classData = await fs.promises.readFile(classesFilePath, 'utf-8');
    const classList = JSON.parse(classData).classes || [];

    // Read fee structure data
    const feeData = await fs.promises.readFile(feeStructureFilePath, 'utf-8');
    const feeStructure = JSON.parse(feeData).fees || [];

    // Map through classes and sections, and fetch corresponding fees
    const result = classList.map((classItem: any) => ({
      className: classItem.className,
      sections: classItem.sections.map((section: any) => {
        const feeInfo = feeStructure.find(
          (feeItem: any) => feeItem.classId === classItem.id
        );

        const sectionFee = feeInfo
          ? feeInfo.fees.find((f: any) => f.sectionName === section.sectionName)
          : null;

        return {
          sectionName: section.sectionName,
          classTeacher: section.classTeacher,
          roomNumber: section.roomNumber || '',
          fees: sectionFee || {},
        };
      }),
    }));

    // Return the class and fee data
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error fetching class or fee data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
