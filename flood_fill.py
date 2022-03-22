def flood_recursive(matrix, x, y, color):
    width = len(matrix)
    height = len(matrix[0])
    same_color_array = []

    def fill(x, y, color):
        if [x, y] in same_color_array:
            return
        # if the square is not the same color as the starting point
        if matrix[x][y] != color:
            return
        else:
            # append the current x,y coords to the array
            same_color_array.append([x, y])
            neighbors = [
                (x - 1, y),
                (x + 1, y),
                (x - 1, y - 1),
                (x + 1, y + 1),
                (x - 1, y + 1),
                (x + 1, y - 1),
                (x, y - 1),
                (x, y + 1),
            ]
            for n in neighbors:
                if 0 <= n[0] <= width - 1 and 0 <= n[1] <= height - 1:
                    fill(n[0], n[1], color)

    fill(x, y, color)

    return {"color": color, "color_array": same_color_array}
