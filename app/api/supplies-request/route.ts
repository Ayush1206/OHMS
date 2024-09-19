import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

// Define the path to the JSON file
const filePath = path.join(process.cwd(), "data", "suppliesRequests.json");

// Function to read the JSON file
const readRequests = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write data to the JSON file
const writeRequests = (data: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing file:", error);
  }
};

// API route handler for POST requests
export async function POST(request: Request) {
    try {
      // Parse the request body
      const reqData = await request.json();
  
      // Fetch role from cookies
      const cookieStore = cookies();
      const userRole = cookieStore.get("role")?.value || "unknown";
  
      // Read the current data from the JSON file
      const currentData = readRequests();
  
      // Add a new request with a timestamp, ID, status, and requested_by field
      const newRequest = {
        id: currentData.length + 1,
        timestamp: new Date().toISOString(),
        status: "pending", // Default status is 'pending'
        requested_by: userRole, // Add the requested_by field with role from cookies
        ...reqData,
      };
  
      // Append the new request to the existing data
      currentData.push(newRequest);
  
      // Write the updated data back to the JSON file
      writeRequests(currentData);
  
      // Return a success response
      return NextResponse.json(
        { message: "Request saved successfully", newRequest },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
    }
  }

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    // Read the current data from the JSON file
    const currentData = readRequests();

    // Find the request by ID and update the status
    const requestIndex = currentData.findIndex((req: any) => req.id === id);

    if (requestIndex === -1) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    currentData[requestIndex].status = status; // Update the status (either 'approved' or 'rejected')

    // Write the updated data back to the JSON file
    writeRequests(currentData);

    // Return a success response
    return NextResponse.json(
      {
        message: `Request ${status}`,
        updatedRequest: currentData[requestIndex],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update request" },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
      // Read data from JSON
      const data = readRequests();
  
      // Filter out only the pending requests
      const pendingRequests = data.filter((request: any) => request.status === "pending");
  
      // Return the filtered requests
      return NextResponse.json({ requests: pendingRequests });
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
    }
  }
