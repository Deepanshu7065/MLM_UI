// // src/components/layout/AppSidebar.tsx
// import { Home, Users, Settings, Info } from "lucide-react";
// import { Link, useRouterState } from "@tanstack/react-router";
// import { cn } from "@/lib/utils";

// const links = [
//   { to: "/", label: "Home", icon: Home },
//   { to: "/dashboard", label: "Dashboard", icon: Users },
//   { to: "/users", label: "Users", icon: Users },
//   { to: "/settings", label: "Settings", icon: Settings },
//   { to: "/about", label: "About", icon: Info },
// ];

// export function AppSidebar() {
//   const { location } = useRouterState();

//   return (
//     <aside className="w-6 h-screen bg-gray-100 text-black p-4 fixed left-0 top-0">
//       <h1 className="text-xl font-semibold mb-6">MLM Dashboard</h1>
//       <nav className="flex flex-col gap-2">
//         {links.map((link) => {
//           const active = location.pathname === link.to;
//           return (
//             <Link
//               key={link.to}
//               to={link.to}
//               className={cn(
//                 "flex items-center gap-2 rounded-md px-3 py-2 transition",
//                 active
//                   ? "bg-gray-700 text-white"
//                   : "text-gray-800 hover:bg-gray-800 hover:text-white"
//               )}
//             >
//               <link.icon className="size-4" />
//               {link.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }
