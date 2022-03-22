from calendar import c
from PIL import Image
import requests
import io
import numpy
import json


def pixelate(input_file, pixel_size):
    image = Image.open(input_file)
    image = image.resize((pixel_size, pixel_size), Image.NEAREST)
    return image


def convert_colors(input_file, palette):
    palette_img = Image.new("P", (16, 16))
    palette_img.putpalette(palette * 64)
    color_converted_image = input_file.convert("RGB").quantize(
        palette=palette_img, dither=0
    )
    # color_converted_image.show()
    return color_converted_image


def create_image(image, palette, number_of_pixels):
    pixel_image = pixelate(image, number_of_pixels)
    converted_image = convert_colors(
        pixel_image, [inner for outer in palette for inner in outer]
    )
    color_array = numpy.array(converted_image.convert("RGB")).tolist()
    color_array = [[tuple(i) for i in j] for j in color_array]
    return color_array


def create_pixel_dict(pixel_list):
    return json.dumps({"color_array": pixel_list})


def create_initial_call_dict(palette, width, height, number_of_answer_letters):
    return json.dumps(
        {
            "color_array": palette,
            "width": width,
            "height": height,
            "number_of_answer_letters": number_of_answer_letters,
        }
    )


response = requests.get(
    "https://www.easylinedrawing.com/wp-content/uploads/2019/07/cartoon_car_drawing_tutorial.png"
)
file = "./art/heart.png"
palette = [[255, 255, 255], [100, 100, 100], [255, 0, 0], [0, 0, 255]]
number_of_pixels = 10
with open("./src/color_array.json", "w") as f:
    f.write(create_pixel_dict(create_image(file, palette, number_of_pixels)))

with open("./src/initial_call.json", "w") as f:
    f.write(
        f"const initial_call = {create_initial_call_dict(palette, number_of_pixels, number_of_pixels, '7')}\nexport default initial_call"
    )
