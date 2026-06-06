import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { CartProvider } from "./contexts/CartContext";
import { TableProvider, useTable } from "./contexts/TableContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Wilaya from "./pages/Wilaya";
import Branches from "./pages/Branches";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Promos from "./pages/Promos";
import TableSelect from "./pages/TableSelect";
import LoaderScreen from "./components/LoaderScreen";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

function TableParamReader() {
  const { setTableNumber } = useTable();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("table");
    if (t && t.trim()) {
      setTableNumber(t.trim());
    }
  }, []);
  return null;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/wilaya" component={Wilaya} />
        <Route path="/wilaya/:id/branches" component={Branches} />
        <Route path="/menu" component={Menu} />
        <Route path="/cart" component={Cart} />
        <Route path="/promos" component={Promos} />
        <Route path="/table" component={TableSelect} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const isAdmin = window.location.pathname === `${base}/admin` || window.location.pathname === "/admin";

  return (
    <QueryClientProvider client={queryClient}>
      <TableProvider>
        <CartProvider>
          <TooltipProvider>
            {!loaderDone && !isAdmin && <LoaderScreen onDone={() => setLoaderDone(true)} />}
            <WouterRouter base={base}>
              <TableParamReader />
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </TableProvider>
    </QueryClientProvider>
  );
}

export default App;
