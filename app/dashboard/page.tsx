// app/dashboard/page.tsx

import { Dashboard } from "@/components";
import { AdminDashboard } from "@/components";
import StudentDashboard from "@/components/ui/studentDashboard.component";
import { cookies } from "next/headers"; // Import the cookies utility

export default function DashboardPage() {
  // Fetch the role from cookies
  const cookieStore = cookies(); // Using the cookies utility
  const role = cookieStore.get("role")?.value; // Assuming role is stored in cookies

  // Conditional rendering based on role
  if (role === "teacher") {
    return (
      <div>
        <Dashboard />
      </div>
    );
  } else if (role === "admin") {
    return (
      <div>
        <AdminDashboard />
      </div>
    );
  } else if (role === "student") {
    return (
      <div>
        <StudentDashboard />
      </div>
    );
  } else {
    return (
      <div>
        <p>Unauthorized access. Please log in with a valid role.</p>
      </div>
    );
  }
}
