import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Auth from "./pages/Auth";

const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bible = lazy(() => import("./pages/Bible"));
const Devotional = lazy(() => import("./pages/Devotional"));
const Modules = lazy(() => import("./pages/Modules"));
const Medals = lazy(() => import("./pages/Medals"));
const DailyVerse = lazy(() => import("./pages/DailyVerse"));
const Plans = lazy(() => import("./pages/Plans"));
const PlanDetail = lazy(() => import("./pages/PlanDetail"));
const PlanDay = lazy(() => import("./pages/PlanDay"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <p className="text-gold animate-pulse font-serif text-xl">Carregando...</p>
  </div>
);

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-gold animate-pulse font-serif text-xl">Carregando...</p></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/biblia" element={<ProtectedRoute><Bible /></ProtectedRoute>} />
            <Route path="/devocional" element={<ProtectedRoute><Devotional /></ProtectedRoute>} />
            <Route path="/modulos" element={<ProtectedRoute><Modules /></ProtectedRoute>} />
            <Route path="/medalhas" element={<ProtectedRoute><Medals /></ProtectedRoute>} />
            <Route path="/versiculo" element={<ProtectedRoute><DailyVerse /></ProtectedRoute>} />
            <Route path="/planos" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
            <Route path="/planos/:planId" element={<ProtectedRoute><PlanDetail /></ProtectedRoute>} />
            <Route path="/planos/:planId/dia/:dayNumber" element={<ProtectedRoute><PlanDay /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
