import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Home, Award, Heart, Compass, Shield, LogOut } from "lucide-react";

const navItems = [
  { icon: Home, label: "Início", path: "/dashboard" },
  { icon: Heart, label: "Devocional", path: "/devocional" },
  { icon: BookOpen, label: "Bíblia", path: "/biblia" },
  { icon: Compass, label: "Módulos", path: "/modulos" },
  { icon: Award, label: "Medalhas", path: "/medalhas" },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { signOut, isAdmin, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1
            className="font-serif text-lg font-bold text-gradient-gold cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Prosperidade com Deus
          </h1>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="text-gold hover:text-gold-light transition-colors"
                title="Painel Admin"
              >
                <Shield className="w-5 h-5" />
              </button>
            )}
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">{children}</main>

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 bg-card/90 backdrop-blur-lg border-t border-border">
        <div className="max-w-4xl mx-auto flex justify-around py-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                  active ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
