-- 003 · Cerrar el acceso anónimo
--
-- La clave `anon` viaja en el código, que es público. Esta migración quita
-- todos sus permisos y se los da únicamente a las sesiones autenticadas.
--
-- ⚠️ Correr SOLO después de comprobar que el login con código funciona.

DROP POLICY IF EXISTS "anon_all" ON vietnam;
DROP POLICY IF EXISTS "anon_all" ON compromisos;

CREATE POLICY "auth_all" ON vietnam      FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all" ON compromisos  FOR ALL TO authenticated USING (true) WITH CHECK (true);

REVOKE ALL ON vietnam     FROM anon;
REVOKE ALL ON compromisos FROM anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON vietnam     TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON compromisos TO authenticated;
