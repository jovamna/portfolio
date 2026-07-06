import json
import os
from functools import lru_cache

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe


register = template.Library()


def get_vite_manifest_path():
    """
    Ajusta esta ruta según tu estructura real.
    Si frontend/dist/.vite/manifest.json existe, úsala.
    """
    backend_dir = settings.BASE_DIR
    project_root = os.path.dirname(backend_dir)  # sube un nivel si backend y frontend son hermanos

    possible_paths = [
        os.path.join(project_root, 'frontend', 'dist', '.vite', 'manifest.json'),
        os.path.join(project_root, 'frontend', 'dist', 'manifest.json'),
        os.path.join(backend_dir, 'frontend', 'dist', '.vite', 'manifest.json'),
        os.path.join(backend_dir, 'frontend', 'dist', 'manifest.json'),
    ]

    for path in possible_paths:
        if os.path.exists(path):
            return path

    raise FileNotFoundError(
        "No se encontró el manifest.json de Vite. "
        "Ejecuta npm run build y verifica la ruta."
    )


@lru_cache(maxsize=1)
def load_vite_manifest():
    manifest_path = get_vite_manifest_path()
    with open(manifest_path, 'r', encoding='utf-8') as f:
        return json.load(f)







@register.simple_tag
def vite_asset_tags(entry='index.html'):
    """
    Inyecta CSS + JS del entry principal usando manifest.json
    """
    manifest = load_vite_manifest()

    if entry not in manifest:
        raise KeyError(f"No se encontró el entry '{entry}' en manifest.json")

    entry_data = manifest[entry]
    tags = []
    seen_css = set()
    seen_preloads = set()

    # CSS principal del entry
    for css_file in entry_data.get('css', []):
        if css_file not in seen_css:
            tags.append(f'<link rel="stylesheet" href="/{css_file}">')
            seen_css.add(css_file)

    # Imports/chunks (por si traen css)
    for import_key in entry_data.get('imports', []):
        import_data = manifest.get(import_key, {})

        for css_file in import_data.get('css', []):
            if css_file not in seen_css:
                tags.append(f'<link rel="stylesheet" href="/{css_file}">')
                seen_css.add(css_file)

    # Modulepreload para imports
    for import_key in entry_data.get('imports', []):
        import_data = manifest.get(import_key, {})
        import_file = import_data.get('file')

        if import_file and import_file not in seen_preloads:
            tags.append(f'<link rel="modulepreload" href="/{import_file}">')
            seen_preloads.add(import_file)

    # JS principal
    if 'file' in entry_data:
        tags.append(f'<script type="module" src="/{entry_data["file"]}"></script>')

    return mark_safe('\n'.join(tags))
















