#!/bin/sh
# Instala el hook que sube la versión en cada commit.
# Los hooks viven en .git/hooks, que no se versiona — por eso hay que instalarlos
# a mano una vez por máquina.
set -e

ROOT=$(git rev-parse --show-toplevel)
HOOK="$ROOT/.git/hooks/pre-commit"

cat > "$HOOK" <<'HOOK_EOF'
#!/bin/sh
set -e
ROOT=$(git rev-parse --show-toplevel)
sh "$ROOT/scripts/bump-version.sh" > /dev/null
git add "$ROOT/preview/app.js" "$ROOT/docs/app.js" 2>/dev/null || true
HOOK_EOF

chmod +x "$HOOK"
echo "Hook instalado en .git/hooks/pre-commit"
