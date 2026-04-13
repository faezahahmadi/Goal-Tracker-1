import Layout from "./Layout/Layout"
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import CreateGoal from "./pages/CreateGoal";
import GoalsList from "./pages/GoalsList";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import GoalDetails from "./pages/GoalDetails";
import getTheme from "./theme";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

import { GoalsProvider } from "./context/GoalContext";
import Archive from "./pages/Archive";
import { useLanguage } from "./context/LanguageContext";


function App() {
  const { dir } = useLanguage();
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });
  const ltrCache = createCache({
    key: "mui"
  });
  const theme = getTheme(dir);

  return (
    <CacheProvider value={dir === "rtl" ? cacheRtl : ltrCache}>

      <GoalsProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/goalsList" element={<GoalsList />} />
            <Route path="/Archive" element={<Archive />} />
            <Route path="/goalsList/:id" element={<GoalDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/createGoal" element={<CreateGoal />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </GoalsProvider>

    </CacheProvider>

  )
}

export default App
