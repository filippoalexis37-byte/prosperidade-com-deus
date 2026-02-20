import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, UserCheck, UserX, Users } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  is_approved: boolean;
  created_at: string;
}

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
      return;
    }
    fetchUsers();
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setUsers(data);
    setLoading(false);
  };

  const toggleApproval = async (userId: string, approve: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: approve })
      .eq("user_id", userId);

    if (error) {
      toast.error("Erro ao atualizar usuário");
      return;
    }

    toast.success(approve ? "Usuário aprovado!" : "Acesso removido");
    setUsers((prev) =>
      prev.map((u) => (u.user_id === userId ? { ...u, is_approved: approve } : u))
    );
  };

  const filteredUsers = users.filter((u) => {
    if (filter === "pending") return !u.is_approved;
    if (filter === "approved") return u.is_approved;
    return true;
  });

  const pendingCount = users.filter((u) => !u.is_approved).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-gold" />
          <h1 className="font-serif text-2xl font-bold text-foreground">Painel Administrativo</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="py-4 text-center">
              <Users className="w-5 h-5 text-gold mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">{users.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="py-4 text-center">
              <UserCheck className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">{users.length - pendingCount}</p>
              <p className="text-xs text-muted-foreground">Aprovados</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="py-4 text-center">
              <UserX className="w-5 h-5 text-orange-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(["all", "pending", "approved"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "Todos" : f === "pending" ? "Pendentes" : "Aprovados"}
            </Button>
          ))}
        </div>

        {/* User List */}
        <div className="space-y-3">
          {loading ? (
            <p className="text-muted-foreground animate-pulse">Carregando...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Nenhum usuário encontrado.</p>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id} className="bg-card border-border">
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-foreground">{user.full_name || "Sem nome"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.is_approved ? (
                      <>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aprovado</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleApproval(user.user_id, false)}
                          className="text-red-400 border-red-400/30"
                        >
                          Revogar
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => toggleApproval(user.user_id, true)}
                      >
                        Aprovar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Admin;
