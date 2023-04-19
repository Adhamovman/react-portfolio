import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages/front";

import { AdminLayout, FrontLayout } from "./components/layout";
import { ToastContainer } from "react-toastify";
import { TOKEN } from "./const";
import NotFound from "./pages/NotFound";
import { ROLE } from "./utils";
import { adminRoutes } from "./const/menus";

import PureCounter from "@srexi/purecounterjs";

const pure = new PureCounter();

function App() {
  const frontRotes = [
    { url: "", page: Home },
    { url: "login", page: Login },
    { url: "register", page: Register },
  ];

  const isAuthorized = localStorage.getItem(TOKEN) && ROLE !== "user";
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {frontRotes.map(({ url, page: Page }) => (
          <Route
            key={url}
            path={"/" + url}
            element={
              <FrontLayout>
                <Page />
              </FrontLayout>
            }
          />
        ))}
        {isAuthorized &&
          adminRoutes.map(({ url, page: Page }) => (
            <Route
              key={url}
              path={"/" + url}
              element={
                <AdminLayout>
                  <Page />
                </AdminLayout>
              }
            />
          ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
