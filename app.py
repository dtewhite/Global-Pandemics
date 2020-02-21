from disease_arrays import pyscript_diseases
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/infectious_disease")

@app.route("/")
def welcome():
    diseases = mongo.db.infectious_disease
    diseases_d = pyscript_diseases()
    diseases.update({}, diseases_d, upsert=True)
    diseases_data = mongo.db.infectious_disease.find_one()
    return (render_template("index.html", m=diseases_data))


if __name__ == '__main__':
    app.run(debug=True)