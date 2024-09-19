// types/inventory.ts

export interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    description?: string;
  }
  
  export interface InventoryCategory {
    id: number;
    name: string;
    items: InventoryItem[];
  }
  