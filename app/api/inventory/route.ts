import { NextResponse } from "next/server";
import fs from "fs/promises"; // Use async version
import path from "path";
import { InventoryCategory } from "@/types/inventory";

// Path to the JSON file
const jsonFilePath = path.join(process.cwd(), "data", "inventory.json");

export async function GET() {
  try {
    const data = await fs.readFile(jsonFilePath, "utf8");
    const inventory = JSON.parse(data);
    const categoriesWithTotalItems = inventory.categories.map(
      (category: InventoryCategory) => ({
        ...category,
        totalItems: category.items ? category.items.length : 0, // Calculate total items
      })
    );

    return NextResponse.json({ categories: categoriesWithTotalItems });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inventory data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await fs.readFile(jsonFilePath, "utf8");
    const inventory = JSON.parse(data);

    // Add new category or item to the inventory based on the request body
    inventory.categories.push(body);

    await fs.writeFile(jsonFilePath, JSON.stringify(inventory, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 });
  }
}
