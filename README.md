# Edgardo Paz-Romero Portfolio

A Flask-served portfolio with a prerendered React frontend. The production build
ships complete HTML for search engines and no-JavaScript visitors, then hydrates
the page for animated headings, tabs, and section-aware navigation.

## Requirements

- Python 3.11+
- Node.js 24+
- Docker (optional)

## Local development

Create a Python virtual environment and install the backend dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Install frontend dependencies and generate the browser bundle plus prerendered
HTML:

```bash
npm ci
npm run build
```

Start Flask locally:

```bash
python mysite.py
```

When editing `frontend/`, run `npm run build` again. `npm run watch` rebuilds
the browser bundle continuously, but run the full build before deployment so
`templates/_portfolio.html` is regenerated too.

## Tests

Build the frontend, then run the standard-library test suite:

```bash
npm run build
python -m unittest discover -s tests
```

The tests cover Flask routes, prerendered content, accessibility landmarks,
compiled assets, SEO metadata, robots.txt, and sitemap.xml.

## Production

Build and run the multi-stage Docker image:

```bash
docker build -t portfolio .
docker run --rm -p 5000:5000 \
  -e SITE_URL=https://your-domain.example \
  portfolio
```

The container builds the frontend with Node, copies only generated assets into
the Python image, and serves Flask through Gunicorn.

Environment variables:

- `SITE_URL`: public origin used for canonical URLs, structured data, and the sitemap.
- `PORT`: Gunicorn port; defaults to `5000`.
- `WEB_CONCURRENCY`: Gunicorn worker count; defaults to `2`.

## Structure

- `mysite.py` — Flask routes, metadata, crawler endpoints.
- `frontend/app.jsx` — React components and client-side behavior.
- `frontend/data.js` — portfolio content and section route mappings.
- `frontend/prerender.jsx` — build-time HTML renderer.
- `static/css/main.css` — site styles.
- `static/dist/app.js` — generated, minified browser bundle.
- `templates/index.html` — document shell and metadata.
- `templates/_portfolio.html` — generated prerendered React markup.
- `tests/` — backend and rendered-output smoke tests.
