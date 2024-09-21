import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { v4 as uuidv4 } from 'uuid'; // Correct import for uuid

// Define paths to your JSON files for classes and fee structure
const classFilePath = path.join(process.cwd(), 'data', 'classes.json');
const feeFilePath = path.join(process.cwd(), 'data', 'feeStructure.json');

// POST: Add class and fee data to the JSON files
export async function POST(req: Request) {
  const classData = await req.json();

  try {
    // Ensure classes.json exists and has valid data
    let classFileData = [];
    if (fs.existsSync(classFilePath)) {
      const fileData = await fs.promises.readFile(classFilePath, 'utf-8');
      classFileData = fileData ? JSON.parse(fileData).classes || [] : [];
    } else {
      await fs.promises.writeFile(classFilePath, JSON.stringify({ classes: [] }, null, 2));
    }

    // Add unique ID for the new class
    const newClassId = uuidv4();
    const newClassData = {
      id: newClassId,
      className: classData.className,
      sections: classData.sections.map((section: any) => ({
        sectionName: section.sectionName,
        strength: section.strength,
        classTeacher: section.classTeacher || null,
        roomNumber: section.roomNumber || null,
      })),
    };

    // Add the new class data to the classFileData
    classFileData.push(newClassData);

    // Write the updated classes back to classes.json
    await fs.promises.writeFile(classFilePath, JSON.stringify({ classes: classFileData }, null, 2));

    // Ensure feeStructure.json exists and has valid data
    let feeFileData = [];
    if (fs.existsSync(feeFilePath)) {
      const feeData = await fs.promises.readFile(feeFilePath, 'utf-8');
      feeFileData = feeData ? JSON.parse(feeData).fees || [] : [];
    } else {
      await fs.promises.writeFile(feeFilePath, JSON.stringify({ fees: [] }, null, 2));
    }

    // Add the fee structure for the class
    const feeData = {
      classId: newClassId,
      fees: classData.sections.map((section: any) => ({
        sectionName: section.sectionName,
        tuitionFee: section.tuitionFee,
        transportationFee: section.transportationFee,
        extracurricularFee: section.extracurricularFee,
        labFee: section.labFee,
      })),
    };

    // Add the new fee data to the feeFileData
    feeFileData.push(feeData);

    // Write the updated fees back to feeStructure.json
    await fs.promises.writeFile(feeFilePath, JSON.stringify({ fees: feeFileData }, null, 2));

    // Return a success response
    return NextResponse.json({ message: 'Class and fees saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving class or fee data:', error);
    return NextResponse.json({ error: 'Error saving data' }, { status: 500 });
  }
}


// GET: Fetch the class data from the JSON file
export async function GET() {
  try {
    const fileData = await fs.promises.readFile(classFilePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

    return NextResponse.json(jsonData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error reading data' }, { status: 500 });
  }
}
