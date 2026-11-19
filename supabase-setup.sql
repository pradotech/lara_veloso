-- ═══════════════════════════════════════════════════════
-- Supabase Setup — Lara Veloso Portfolio
-- Execute este SQL no SQL Editor do Supabase Dashboard
-- ═══════════════════════════════════════════════════════

-- ──────────── TABELA: projects ────────────
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  youtube_id TEXT DEFAULT '',
  category TEXT DEFAULT '',
  year TEXT DEFAULT '',
  role TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ──────────── TABELA: productions ────────────
CREATE TABLE IF NOT EXISTS productions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  type TEXT DEFAULT '',
  year TEXT DEFAULT '',
  discipline TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ──────────── TABELA: events ────────────
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  year TEXT DEFAULT '',
  cover_image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  external_url TEXT,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ──────────── RLS (Row Level Security) ────────────
-- Habilitar RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE productions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Leitura pública (qualquer pessoa pode ver)
CREATE POLICY "Leitura pública de projetos"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Leitura pública de produções"
  ON productions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Inserção apenas para autenticados
CREATE POLICY "Inserir projetos (autenticado)"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Inserir produções (autenticado)"
  ON productions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Atualização apenas para autenticados
CREATE POLICY "Atualizar projetos (autenticado)"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Atualizar produções (autenticado)"
  ON productions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Exclusão apenas para autenticados
CREATE POLICY "Excluir projetos (autenticado)"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Excluir produções (autenticado)"
  ON productions FOR DELETE
  TO authenticated
  USING (true);

-- Políticas para events
CREATE POLICY "Leitura pública de eventos"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Inserir eventos (autenticado)"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Atualizar eventos (autenticado)"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Excluir eventos (autenticado)"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- ──────────── SEED DATA (dados iniciais) ────────────
INSERT INTO projects (title, description, youtube_id, category, year, role) VALUES
  ('Videoclipe ''Memoria''', '', '#', 'Curta-metragem', '2025', 'Cobertura de making off e fotografia a Still'),
  ('Caruara - Curta-metragem de terror', '', '#', 'Documentário', '2025', 'Direção de fotografia'),
  ('Narrativa Reversa - Audiovisual Experimental', '', '#', 'Ficção', '2024', 'Direção de fotografia e Montagem');

INSERT INTO productions (title, description, type, year, discipline) VALUES
  ('Relações de trabalho do setor audiovisual na cidade de São Paulo', 'Projeto de iniciação científica, Escola Superior de Propaganda e Marketing, curso de Cinema e Audiovisual.', '', '2025', ''),
  ('Aluno pesquisador', 'Grupo de pesquisa audiovisual sobre a produção de documentários no Brasil.', '', '2025', '');

INSERT INTO events (title, description, category, year) VALUES
  ('Festival de Cinema Universitário', 'Participação com o curta-metragem Caruara no festival de cinema universitário.', 'Festival', '2025'),
  ('Mostra ESPM de Audiovisual', 'Exibição de trabalhos acadêmicos na mostra interna da ESPM.', 'Mostra', '2024');
