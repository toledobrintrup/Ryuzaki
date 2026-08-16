# Migraciones de Supabase

Cada archivo es un cambio a la estructura de la base de datos, numerado en el
orden en que se corrió. **Ya están aplicados** — esto es el historial, no una
lista de pendientes.

## Cómo agregar uno nuevo

1. Escribir el SQL en un archivo `NNN_nombre_corto.sql` (el siguiente número).
2. Pegarlo en el SQL Editor de Supabase y darle Run.
3. Commitear el archivo.

Las pestañas del SQL Editor son borradores: se cierran sin guardar. El historial
real vive acá.

## Para reconstruir la base desde cero

Correr los archivos en orden numérico. Los `INSERT` de datos iniciales no están
incluidos a propósito — el contenido vive en la base, no en el repo.
