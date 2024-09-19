import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to your JSON file where the classes data will be stored
const filePath = path.join(process.cwd(), 'data', 'classes.json');

// POST: Add class data to the JSON file
export async function POST(req: Request) {
  const classData = await req.json();

  try {
    const fileData = await fs.promises.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

    jsonData.classes.push(classData);

    await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    return NextResponse.json({ message: 'Class data saved successfully' }, { status: 200 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Error saving data' }, { status: 500 });
  }
}

// GET: Fetch the class data from the JSON file
export async function GET() {
  try {
    const fileData = await fs.promises.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

    return NextResponse.json(jsonData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error reading data' }, { status: 500 });
  }
}