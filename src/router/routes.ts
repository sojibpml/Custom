import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import Login from "@/pages/dashboard/auth/Login.vue";
import Register from "@/pages/dashboard/auth/Register.vue";
import Dashboard from "@/pages/dashboard/Dashboard.vue";
import Employees from "@/pages/dashboard/Employees.vue";
import Payroll from "@/pages/dashboard/Payroll.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "Dashboard", keepAlive: true },
      },
      {
        path: "employees",
        name: "Employees",
        component: Employees,
        meta: { title: "Employees", keepAlive: true },
      },
      {
        path: "payroll",
        name: "Payroll",
        component: Payroll,
        meta: { title: "Payroll", keepAlive: true },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  authStore.initializeAuth();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
