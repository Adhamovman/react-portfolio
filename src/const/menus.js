import {
  BarChartOutlined,
  CopyOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Dashboard,
  Experiences,
  Messages,
  Portfolios,
  Skills,
  Users,
} from "../pages/admin";
import { ROLE } from "../utils";

let routes = [
  {
    url: "dashboard",
    page: Dashboard,
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  { url: "users", page: Users, icon: <UserOutlined />, label: "Users" },
  {
    url: "experiences",
    page: Experiences,
    icon: <ExperimentOutlined />,
    label: "Experiences",
  },
  {
    url: "messages",
    page: Messages,
    icon: <MessageOutlined />,
    label: "Messeges",
  },
  {
    url: "portfolios",
    page: Portfolios,
    icon: <CopyOutlined />,
    label: "Portfolios",
  },
  { url: "skills", page: Skills, icon: <BarChartOutlined />, label: "Skills" },
];

let hiddenRoutes = ROLE === "client" ? ["users"] : [];

export const adminRoutes = routes.filter(
  (route) => !hiddenRoutes.includes(route.url)
);
