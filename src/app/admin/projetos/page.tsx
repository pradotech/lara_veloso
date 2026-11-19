"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { supabase, type Project } from "@/lib/supabase";

function extractYouTubeId(input: string): string {
  if (!input) return "";
  // Se já é só o ID (11 caracteres alfanuméricos)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) return input.trim();
  try {
    const url = new URL(input.trim());
    // youtube.com/watch?v=ID
    if (url.searchParams.get("v")) return url.searchParams.get("v")!;
    // youtu.be/ID
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
    // youtube.com/embed/ID ou youtube.com/shorts/ID
    const match = url.pathname.match(/\/(embed|shorts|v)\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[2];
  } catch {
    // não é URL válida, retorna o input original
  }
  return input.trim();
}

type MediaType = "youtube" | "image";

const emptyProject: Omit<Project, "id" | "created_at"> = {
  title: "",
  description: "",
  youtube_id: "",
  category: "",
  year: new Date().getFullYear().toString(),
  role: "",
  cover_image_url: "",
  gallery_urls: [],
  external_url: "",
  display_order: null,
};

export default function AdminProjetosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [mediaType, setMediaType] = useState<MediaType>("youtube");
  const [saving, setSaving] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    setProjects(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openNew = () => {
    setEditing(null);
    setForm(emptyProject);
    setMediaType("youtube");
    setGalleryFiles([]);
    setExistingGalleryUrls([]);
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description,
      youtube_id: p.youtube_id,
      category: p.category,
      year: p.year,
      role: p.role,
      cover_image_url: p.cover_image_url ?? "",
      gallery_urls: p.gallery_urls ?? [],
      external_url: p.external_url ?? "",
      display_order: p.display_order ?? null,
    });
    setGalleryFiles([]);
    
    // Se tem galeria, usa. Senão, se tiver coverImage herda como primeiro item
    const initialGallery = p.gallery_urls && p.gallery_urls.length > 0
      ? p.gallery_urls
      : (p.cover_image_url ? [p.cover_image_url] : []);
      
    setExistingGalleryUrls(initialGallery);
    setMediaType(initialGallery.length > 0 || p.cover_image_url ? "image" : "youtube");
    setModalOpen(true);
  };

  const handleFilesSelect = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (validFiles.length > 0) {
      setGalleryFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const removeExistingUrl = (index: number) => {
    setExistingGalleryUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadGalleryImages = async (): Promise<string[]> => {
    if (galleryFiles.length === 0) return [];
    setUploading(true);
    
    const urls: string[] = [];
    
    for (const file of galleryFiles) {
      const ext = file.name.split(".").pop();
      const fileName = `projects/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage
        .from("covers")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
        
      if (error) {
        console.error("Upload error para", file.name, error);
        alert(`Erro ao fazer upload da imagem ${file.name}.`);
        continue;
      }
      
      const { data: urlData } = supabase.storage.from("covers").getPublicUrl(fileName);
      urls.push(urlData.publicUrl);
    }
    
    setUploading(false);
    return urls;
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);

    let finalUrls: string[] = [];
    
    if (mediaType === "image") {
      const newUrls = await uploadGalleryImages();
      finalUrls = [...existingGalleryUrls, ...newUrls];
      
      if (finalUrls.length === 0) {
        // Se escolheu imagem mas não tem nenhuma
        setSaving(false);
        return;
      }
    }

    const firstCoverUrl = finalUrls.length > 0 ? finalUrls[0] : null;

    const dataToSave = {
      title: form.title,
      description: form.description,
      category: form.category,
      year: form.year,
      role: form.role,
      external_url: form.external_url?.trim() || null,
      youtube_id: mediaType === "youtube" ? extractYouTubeId(form.youtube_id) : "",
      cover_image_url: mediaType === "image" ? firstCoverUrl : null,
      gallery_urls: mediaType === "image" ? finalUrls : [],
      display_order: form.display_order,
    };

    if (editing) {
      // Ignorar deleção do storage por simplicidade (galeria pode ter muitas fotos cruzadas com o que foi removido).
      await supabase.from("projects").update(dataToSave).eq("id", editing.id);
    } else {
      await supabase.from("projects").insert(dataToSave);
    }

    setSaving(false);
    setModalOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  const getMediaIcon = (p: Project) => {
    if (p.cover_image_url) {
      return (
        <span title="Imagem de capa" style={{ fontSize: "0.85rem" }}>🖼️</span>
      );
    }
    return (
      <span title="Vídeo YouTube" style={{ fontSize: "0.85rem" }}>▶️</span>
    );
  };

  return (
    <AdminGuard>
      <div className="admin-shell">
        <AdminSidebar />
        <main className="admin-content">
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Projetos Audiovisuais</h1>
              <p className="admin-page-subtitle">
                Gerencie os projetos exibidos no portfólio
              </p>
            </div>
            <button className="admin-btn-add" onClick={openNew}>
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
              Novo Projeto
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="admin-loading" style={{ minHeight: "200px" }}>
              <div className="admin-spinner" />
            </div>
          ) : projects.length === 0 ? (
            <div className="admin-table-container">
              <div className="admin-empty">
                <div className="admin-empty-icon">🎬</div>
                <h3>Nenhum projeto ainda</h3>
                <p>Clique em &quot;Novo Projeto&quot; para começar</p>
              </div>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Mídia</th>
                    <th style={{ width: "60px", textAlign: "center" }}>Ordem</th>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Ano</th>
                    <th>Função</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td style={{ textAlign: "center", width: "50px" }}>{getMediaIcon(p)}</td>
                      <td style={{ textAlign: "center", fontWeight: "bold", color: "var(--admin-accent)" }}>
                        {p.display_order ?? <span style={{ color: "#52525b" }}>—</span>}
                      </td>
                      <td className="admin-table-title">
                        {p.title}
                        {p.external_url && (
                          <span title="Tem link externo" style={{ marginLeft: "6px", fontSize: "0.75rem" }}>🔗</span>
                        )}
                      </td>
                      <td>
                        <span className="admin-badge">{p.category}</span>
                      </td>
                      <td>{p.year}</td>
                      <td style={{ maxWidth: "200px" }}>{p.role}</td>
                      <td>
                        <div className="admin-actions">
                          <button
                            className="admin-btn-icon"
                            onClick={() => openEdit(p)}
                            title="Editar"
                          >
                            <svg
                              width="15"
                              height="15"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          <button
                            className="admin-btn-icon delete"
                            onClick={() => handleDelete(p.id)}
                            title="Excluir"
                          >
                            <svg
                              width="15"
                              height="15"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal */}
          {modalOpen && (
            <div
              className="admin-modal-overlay"
              onClick={(e) =>
                e.target === e.currentTarget && setModalOpen(false)
              }
            >
              <div className="admin-modal">
                <div className="admin-modal-header">
                  <h2>{editing ? "Editar Projeto" : "Novo Projeto"}</h2>
                  <button
                    className="admin-modal-close"
                    onClick={() => setModalOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="admin-modal-body">
                  <div className="admin-form-group">
                    <label className="admin-label">Título *</label>
                    <input
                      className="admin-input"
                      placeholder="Nome do projeto"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Descrição</label>
                    <textarea
                      className="admin-textarea"
                      placeholder="Descrição do projeto"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>

                  {/* Tipo de Mídia */}
                  <div className="admin-form-group">
                    <label className="admin-label">Tipo de Mídia</label>
                    <div style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}>
                      <button
                        type="button"
                        onClick={() => setMediaType("youtube")}
                        style={{
                          flex: 1,
                          padding: "0.625rem 1rem",
                          borderRadius: "0.5rem",
                          border: mediaType === "youtube"
                            ? "2px solid var(--admin-accent, #a78bfa)"
                            : "1px solid rgba(255,255,255,0.1)",
                          background: mediaType === "youtube"
                            ? "rgba(167, 139, 250, 0.15)"
                            : "rgba(255,255,255,0.05)",
                          color: mediaType === "youtube"
                            ? "var(--admin-accent, #a78bfa)"
                            : "rgba(255,255,255,0.6)",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        ▶️ Vídeo YouTube
                      </button>
                      <button
                        type="button"
                        onClick={() => setMediaType("image")}
                        style={{
                          flex: 1,
                          padding: "0.625rem 1rem",
                          borderRadius: "0.5rem",
                          border: mediaType === "image"
                            ? "2px solid var(--admin-accent, #a78bfa)"
                            : "1px solid rgba(255,255,255,0.1)",
                          background: mediaType === "image"
                            ? "rgba(167, 139, 250, 0.15)"
                            : "rgba(255,255,255,0.05)",
                          color: mediaType === "image"
                            ? "var(--admin-accent, #a78bfa)"
                            : "rgba(255,255,255,0.6)",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        🖼️ Imagem de Capa
                      </button>
                    </div>
                  </div>

                  {/* Campo condicional: YouTube ou Imagem */}
                  {mediaType === "youtube" ? (
                    <div className="admin-form-group">
                      <label className="admin-label">Link do YouTube</label>
                      <input
                        className="admin-input"
                        placeholder="Cole o link do vídeo do YouTube"
                        value={form.youtube_id}
                        onChange={(e) =>
                          setForm({ ...form, youtube_id: e.target.value })
                        }
                      />
                      <small style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>
                        Cole a URL completa (ex: https://www.youtube.com/watch?v=abc123)
                      </small>
                    </div>
                  ) : (
                    <div className="admin-form-group">
                      <label className="admin-label">Galeria de Imagens</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files) handleFilesSelect(e.target.files);
                        }}
                      />

                      {(existingGalleryUrls.length > 0 || galleryFiles.length > 0) ? (
                        /* Preview multiplas imagens */
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                          {existingGalleryUrls.map((url, i) => (
                            <div key={`exist-${i}`} style={{ position: "relative", aspectRatio: "1", borderRadius: "0.5rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
                              <img src={url} alt={`img-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              <button
                                type="button"
                                onClick={() => removeExistingUrl(i)}
                                style={{ position: "absolute", top: 2, right: 2, background: "rgba(239, 68, 68, 0.9)", color: "white", border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          
                          {galleryFiles.map((file, i) => (
                            <div key={`new-${i}`} style={{ position: "relative", aspectRatio: "1", borderRadius: "0.5rem", overflow: "hidden", border: "1px dashed var(--admin-accent, #a78bfa)" }}>
                              <img src={URL.createObjectURL(file)} alt={`new-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
                              <button
                                type="button"
                                onClick={() => removeGalleryFile(i)}
                                style={{ position: "absolute", top: 2, right: 2, background: "rgba(239, 68, 68, 0.9)", color: "white", border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", aspectRatio: "1", borderRadius: "0.5rem", border: "1px dashed rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)", cursor: "pointer" }}
                          >
                            <span style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.5)" }}>+</span>
                          </div>
                        </div>
                      ) : (
                        /* Dropzone Inicial */
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                          style={{
                            border: dragOver
                              ? "2px dashed var(--admin-accent, #a78bfa)"
                              : "2px dashed rgba(255,255,255,0.15)",
                            borderRadius: "0.75rem",
                            padding: "2rem",
                            cursor: "pointer",
                            textAlign: "center",
                            transition: "all 0.2s ease",
                            background: dragOver
                              ? "rgba(167, 139, 250, 0.08)"
                              : "rgba(255,255,255,0.02)",
                          }}
                        >
                          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</div>
                          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", margin: 0 }}>
                            Arraste imagens aqui ou <span style={{ color: "var(--admin-accent, #a78bfa)", textDecoration: "underline" }}>clique para selecionar várias</span>
                          </p>
                          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", margin: "0.5rem 0 0" }}>
                            JPG, PNG, WebP — máx. 5MB cada
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* URL externa */}
                  <div className="admin-form-group">
                    <label className="admin-label">URL Externa (opcional)</label>
                    <input
                      className="admin-input"
                      placeholder="Link para o visitante acessar (ex: https://...)"
                      value={form.external_url ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, external_url: e.target.value })
                      }
                    />
                    <small style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>
                      Se preenchido, aparecerá um botão &quot;Acessar projeto&quot; no card
                    </small>
                  </div>
                  
                  {/* Categoria, Ano, Ordem */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div className="admin-form-group">
                      <label className="admin-label">Categoria</label>
                      <input
                        className="admin-input"
                        placeholder="Curta-metragem"
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Ano</label>
                      <input
                        className="admin-input"
                        placeholder="2025"
                        value={form.year}
                        onChange={(e) =>
                          setForm({ ...form, year: e.target.value })
                        }
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Ordem</label>
                      <input
                        className="admin-input"
                        type="number"
                        placeholder="1, 2, 3..."
                        value={form.display_order ?? ""}
                        onChange={(e) =>
                          setForm({ ...form, display_order: e.target.value === "" ? null : Number(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Função</label>
                    <input
                      className="admin-input"
                      placeholder="Ex: Direção de fotografia"
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="admin-modal-footer">
                  <button
                    className="admin-btn-secondary"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="admin-btn-primary"
                    style={{ width: "auto" }}
                    onClick={handleSave}
                    disabled={saving || !form.title.trim()}
                  >
                    {saving ? (uploading ? "Enviando imagem…" : "Salvando…") : editing ? "Salvar" : "Criar"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}
