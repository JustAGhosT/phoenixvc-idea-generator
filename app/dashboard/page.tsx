import { requireAuth } from "@/lib/auth-utils";

export default async function DashboardPage() {
  // This will redirect to login if not authenticated
  const session = await requireAuth();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name}!</p>
      {/* Rest of your dashboard content */}
    </div>
  );
}