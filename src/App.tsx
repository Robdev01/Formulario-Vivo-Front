import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SearchUser from "./pages/SearchUser";
import SearchAdmin from "./pages/SearchAdmin";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import PrivateRoute from "./pages/PrivateRoute"; 
import EditarCliente from './pages/EditarCliente';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/registeruser" element={<Register />} />

          {/* Rotas privadas */}
          <Route
            path="/index"
            element={
              <PrivateRoute>
                <Index />
              </PrivateRoute>
            }
          />
          <Route
            path="/searchuser"
            element={
              <PrivateRoute>
                <SearchUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/searchadmin"
            element={
              <PrivateRoute>
                <SearchAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/editar/:id" 
          element={
            <PrivateRoute>
          <EditarCliente />
          </PrivateRoute>
        } />
          

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
