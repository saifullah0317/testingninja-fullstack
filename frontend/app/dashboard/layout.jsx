import Dashboard from "../components/Dashboard";
export default function DashboardLayout({
  children
}) {
  return (
    <section>
        <Dashboard/>
        <div className="bg-sgray-100 w-full min-h-screen">
        <div className="p-4 sm:ml-64">
            {children}
        </div>
        </div>
    </section>
  );
}
