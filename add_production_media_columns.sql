-- Adicionar colunas de mídia e link externo à tabela productions
-- (espelhando a estrutura da tabela events)

ALTER TABLE productions
ADD COLUMN IF NOT EXISTS cover_image_url TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS gallery_urls TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS external_url TEXT DEFAULT NULL;
