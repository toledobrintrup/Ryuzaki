-- 001 · Manos a la obra: tablas base (vietnam + compromisos)
-- Corrida el 16-ago-2026

CREATE TABLE vietnam (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  decision text NOT NULL,
  area text,
  firmeza text DEFAULT 'ABSOLUTO',
  fecha text,
  veces integer DEFAULT 0,
  por text,
  trampa text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE compromisos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo text NOT NULL,
  area text,
  descripcion text,
  orden integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vietnam ENABLE ROW LEVEL SECURITY;
ALTER TABLE compromisos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_all" ON vietnam FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON compromisos FOR ALL TO anon USING (true) WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON vietnam TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON compromisos TO anon;
