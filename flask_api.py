from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import flood_fill

# Set up Flask:
app = Flask(__name__)
# Set up Flask to bypass CORS:
cors = CORS(app)
# Create the receiver API POST endpoint:
@app.route("/initial_call", methods=["POST"])
def initial_call():
    data = request.get_json()
    data = jsonify(data)
    print(data)
    return data


@app.route("/guess", methods=["POST"])
def guess():
    data = request.get_json()
    data = jsonify(data).json
    color = data["color"]
    color = rgb_to_array(data["color"])
    # print(color)
    x, y = data["cell_location"]
    correct_color = color_array[x][y]
    if color != correct_color:
        cell_locations = {"color": correct_color, "color_array": [[x, y]]}
    else:
        cell_locations = flood_fill.flood_recursive(color_array, x, y, color)
    return cell_locations


with open("./src/color_array.json", "r") as f:
    color_array = json.loads(f.read())["color_array"]


def rgb_to_array(rgb: str) -> list:
    return [int(i.strip()) for i in rgb[4:-1].split(",")]


if __name__ == "__main__":
    app.run(debug=True)
