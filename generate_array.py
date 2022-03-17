import random
import json


def generate_array(x, y):
    array = []
    for _ in range(x):
        row = []
        for _ in range(y):
            row.append(random.choice(["blue", "red", "green", "orange", "black"]))
        array.append(row)
    return {"color_array": array}


with open("./src/color_array.json", "w") as f:
    f.write(json.dumps(generate_array(15, 15)))
