# Python code for backend using Flask
from flask import Flask, render_template, request, redirect, url_for
import os
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
import sqlite3

conn = sqlite3.connect('data.sql')  
cursor = conn.cursor()

# Routes
@app.route('/')
def index():
    cursor.execute('SELECT * FROM trips')
    entries = cursor.fetchall()
    return render_template('index.html', entries=entries)

@app.route('/add_trip', methods=['POST'])
def add_trip():
    location = request.form['location']
    date = request.form['date']
    description = request.form['description']

    image = request.files['image']
    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join('static/images', filename))
    else:
        filename = ''
    cursor.execute('INSERT INTO trips (location, date, description) VALUES (?, ?, ?)', (location, date, description))
    conn.commit()

    return jsonify({'status': 'success'})

# @app.route('/get_trips')
# def get_trips():
#     cursor.execute('SELECT * FROM trips')
#     trips = cursor.fetchall()
#     return jsonify({'trips': trips})

if __name__ == '__main__':
    app.run(debug=True)
