# Malaika Naz | AI/ML Developer Portfolio

A single-page portfolio built with plain HTML, CSS and JavaScript and served by Nginx in a Docker container. The hero background is a small canvas animation: a map of my skills, linked by what I used together in real projects.

## Add your photo
Save your portrait as `assets/malaika.jpg` (portrait orientation, roughly 800x1000). Until then the page shows an "MN" monogram.

## Run locally
Open `index.html` in a browser.

## Docker
```bash
docker build -t malikanaz/malaika-portfolio:1.0 .
docker run -d -p 8080:80 --name malaika-portfolio malikanaz/malaika-portfolio:1.0
```
Open http://localhost:8080

## Upload to GitHub
```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/Malaika-Naz315/malaika-portfolio.git
git push -u origin main
```
Create the empty `malaika-portfolio` repository on GitHub first.

## Built with
HTML, CSS, JavaScript (canvas), Nginx, Docker
