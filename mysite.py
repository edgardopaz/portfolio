from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", initial_section=None)


@app.route("/projects")
def projects():
    return render_template("index.html", initial_section="projects")


@app.route("/about-me")
def about_me():
    return render_template("index.html", initial_section="about")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
