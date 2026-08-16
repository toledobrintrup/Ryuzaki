-- 002 · Vietnam: reestructura en siete campos explícitos
-- Corrida el 16-ago-2026

ALTER TABLE vietnam RENAME COLUMN por TO por_que_termina;
ALTER TABLE vietnam RENAME COLUMN trampa TO por_que_caigo;
ALTER TABLE vietnam ADD COLUMN que_paso text;
ALTER TABLE vietnam ADD COLUMN que_costo text;
