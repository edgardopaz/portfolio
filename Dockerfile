FROM node:24-alpine AS frontend-builder

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY frontend ./frontend
RUN npm run build


FROM python:3.11-alpine

WORKDIR /portfolio_app

RUN python -m pip install --upgrade pip

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY --from=frontend-builder /build/static/dist ./static/dist
COPY --from=frontend-builder /build/templates/_portfolio.html ./templates/_portfolio.html

EXPOSE 5000

# Run behind a production WSGI server. exec ensures Gunicorn receives stop signals.
CMD ["sh", "-c", "exec gunicorn --bind 0.0.0.0:${PORT:-5000} --workers ${WEB_CONCURRENCY:-2} --access-logfile - --error-logfile - mysite:app"]
