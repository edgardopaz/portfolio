import os

from flask import Flask, Response, render_template, request, url_for

app = Flask(__name__)

PAGE_METADATA = {
    "home": {
        "path": "/",
        "title": "Edgardo Paz-Romero | Software Engineer",
        "description": (
            "Portfolio of Edgardo Paz-Romero, a Computer Science student building "
            "full-stack applications, backend services, and developer tools."
        ),
    },
    "about": {
        "path": "/about-me",
        "title": "About | Edgardo Paz-Romero",
        "description": (
            "Learn about Edgardo Paz-Romero's full-stack and backend engineering "
            "experience, machine learning, and approach to building cool software."
        ),
    },
    "experience": {
        "path": "/experience",
        "title": "Experience | Edgardo Paz-Romero",
        "description": (
            "Explore Edgardo Paz-Romero's experience in software engineering, "
            "technical operations, research, and event operations."
        ),
    },
    "projects": {
        "path": "/projects",
        "title": "Projects | Edgardo Paz-Romero",
        "description": (
            "Explore software projects by Edgardo Paz-Romero, including Flashcard "
            "Flask, a transfer market value predictor, and the full-stack LoLdle game."
        ),
    },
}


def get_site_url():
    return os.environ.get("SITE_URL", request.url_root).rstrip("/")


def render_portfolio(page_name, initial_section=None):
    metadata = PAGE_METADATA[page_name]
    site_url = get_site_url()
    canonical_url = f"{site_url}{metadata['path']}"
    profile_image_url = f"{site_url}{url_for('static', filename='images/profile.jpg')}"
    structured_data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": f"{site_url}/#person",
                "name": "Edgardo Paz-Romero",
                "url": f"{site_url}/",
                "image": profile_image_url,
                "jobTitle": "Software Engineer",
                "sameAs": [
                    "https://github.com/edgardopaz",
                    "https://www.linkedin.com/in/edgardopazromero",
                ],
                "alumniOf": {
                    "@type": "CollegeOrUniversity",
                    "name": "Temple University",
                },
                "knowsAbout": [
                    "Python",
                    "JavaScript",
                    "TypeScript",
                    "Go",
                    "React",
                    "Flask",
                    "Docker",
                    "Kubernetes",
                    "SQLite",
                ],
            },
            {
                "@type": "WebSite",
                "@id": f"{site_url}/#website",
                "url": f"{site_url}/",
                "name": "Edgardo Paz-Romero Portfolio",
                "author": {"@id": f"{site_url}/#person"},
            },
        ],
    }
    return render_template(
        "index.html",
        initial_section=initial_section,
        metadata=metadata,
        canonical_url=canonical_url,
        profile_image_url=profile_image_url,
        structured_data=structured_data,
    )


@app.route("/")
def index():
    return render_portfolio("home")


@app.route("/projects")
def projects():
    return render_portfolio("projects", initial_section="projects")


@app.route("/about-me")
def about_me():
    return render_portfolio("about", initial_section="about")


@app.route("/experience")
def experience():
    return render_portfolio("experience", initial_section="experience")


@app.route("/robots.txt")
def robots():
    sitemap_url = f"{get_site_url()}{url_for('sitemap')}"
    content = render_template("robots.txt", sitemap_url=sitemap_url)
    return Response(content, mimetype="text/plain")


@app.route("/sitemap.xml")
def sitemap():
    site_url = get_site_url()
    pages = [
        f"{site_url}{metadata['path']}"
        for metadata in PAGE_METADATA.values()
    ]
    content = render_template("sitemap.xml", pages=pages)
    return Response(content, mimetype="application/xml")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
