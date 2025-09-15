FROM python:3.11-alpine

WORKDIR /portfolio_app

# Faster installs; add build tools only if you need compiled deps later
RUN python -m pip install --upgrade pip

# Copy and install dependencies first (better layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app
COPY . .

# Flask usually listens on 5000; change if your app uses another port
EXPOSE 5000

# Prefer exec-form CMD
CMD ["python", "mysite.py"]
