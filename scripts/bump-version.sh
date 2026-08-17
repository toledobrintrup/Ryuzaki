#!/bin/sh
# Sube el marcador de versión que se ve abajo a la derecha en la app.
# El número es la cantidad de commits + 1, o sea: cada commit = una versión.
#
# Lo corre solo el hook de pre-commit. Para instalarlo en una máquina nueva:
#   sh scripts/install-hooks.sh
set -e

ROOT=$(git rev-parse --show-toplevel)
NUM=$(( $(git rev-list --count HEAD 2>/dev/null || echo 0) + 1 ))
VER="V$NUM"

for f in "$ROOT/preview/app.js" "$ROOT/docs/app.js"; do
  [ -f "$f" ] || continue
  perl -pi -e "s/^const RYU_VERSION = '[^']*';/const RYU_VERSION = '$VER';/" "$f"
done

echo "$VER"
