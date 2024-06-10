import os
from flask import Blueprint, render_template, send_file, jsonify
from zipfile import ZipFile
from io import BytesIO
import json

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/download-extension')
def download_extension():
    memory_file = BytesIO()
    with ZipFile(memory_file, 'w') as zf:
        extension_dir = 'extension'
        for dirname, subdirs, files in os.walk(extension_dir):
            zf.write(dirname)
            for filename in files:
                zf.write(os.path.join(dirname, filename))
    memory_file.seek(0)
    return send_file(memory_file, attachment_filename='extension.zip', as_attachment=True)

@main.route('/api/settings')
def settings():
    with open('config/settings.json') as f:
        data = json.load(f)
    return jsonify(data)