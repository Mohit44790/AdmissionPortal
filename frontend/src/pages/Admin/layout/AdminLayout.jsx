import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <NavLink to="/admin/programs" className="block hover:underline">
          Program Master
        </NavLink>

        <NavLink to="/admin/colleges" className="block hover:underline">
          College Master
        </NavLink>

        <NavLink to="/admin/courses" className="block hover:underline">
          Course Master
        </NavLink>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
