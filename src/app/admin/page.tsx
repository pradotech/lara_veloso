"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [productionCount, setProductionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      const [projectsRes, productionsRes] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase
          .from("productions")
          .select("id", { count: "exact", head: true }),
      ]);
      setProjectCount(projectsRes.count ?? 0);
      setProductionCount(productionsRes.count ?? 0);
      setLoading(false);
    }
    fetchCounts();
  }, []);

  return (
    <AdminGuard>
      <div className="admin-shell">
        <AdminSidebar />
        <main className="admin-content">
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Dashboard</h1>
              <p className="admin-page-subtitle">
                Visão geral do seu portfólio
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="admin-stats">
            <Link
              href="/admin/projetos"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="admin-stat-card">
                <div className="admin-stat-icon projects">🎬</div>
                <p className="admin-stat-value">
                  {loading ? "…" : projectCount}
                </p>
                <p className="admin-stat-label">Projetos Audiovisuais</p>
              </div>
            </Link>

            <Link
              href="/admin/producoes"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="admin-stat-card">
                <div className="admin-stat-icon productions">📚</div>
                <p className="admin-stat-value">
                  {loading ? "…" : productionCount}
                </p>
                <p className="admin-stat-label">Produções Acadêmicas</p>
              </div>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="admin-table-container" style={{ padding: "1.5rem" }}>
            <h3
              style={{
                color: "#f4f4f5",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                margin: "0 0 1rem",
              }}
            >
              Ações Rápidas
            </h3>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/admin/projetos">
                <button className="admin-btn-add">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Gerenciar Projetos
                </button>
              </Link>
              <Link href="/admin/producoes">
                <button className="admin-btn-add">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Gerenciar Produções
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
