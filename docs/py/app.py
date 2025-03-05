from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    repo = 'Leonyxtested/webtest.github.io'
    path = 'docs/prueba.txt'  # Cambia esto por la ruta de tu archivo
    line_number = 10  # Cambia esto por el número de la línea que quieres mostrar

    url = f'https://raw.githubusercontent.com/{repo}/main/{path}'
    response = requests.get(url)
    lines = response.text.split('\n')
    line_content = lines[line_number - 1] if len(lines) >= line_number else 'Línea no encontrada'

    return render_template('index.html', line_content=line_content)

if __name__ == '__main__':
    app.run(debug=True)
