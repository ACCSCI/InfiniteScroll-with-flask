from itertools import count

from flask import Flask, render_template, request, jsonify, make_response
import random
import time

app = Flask(__name__)
heading = "Lorem ipsum dolor sit amet."

content = """
Lorem ipsum dolor sit amet consectetur,adipisicing elit.
Repellat inventore assumenda laboriosam,
obcaecati saepe pariatur atque est? Quam.molestias nisi.
"""

db = list()

posts = 200

quantity = 10

for x in range(posts):
    heading_parts = heading.split(" ")
    random.shuffle(heading_parts)

    content_parts = content.split(" ")
    random.shuffle(content_parts)

    db.append([x, " ".join(heading_parts), " ".join(content_parts)])


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/load")
def load():
    time.sleep(0.2)

    if request.args:
        counter = int(request.args.get("c"))

        if counter == 0:
            print(f"Returning posts 0 to {quantity}")

            res = make_response(jsonify(db[0:quantity]), 200) #列表切片，包头不含尾

        elif counter == posts:
            print("No more posts")
            res = make_response(jsonify({}),200)

        else:
            print(f"Returning posts {counter} to {counter + quantity}")

            res = make_response(jsonify(db[counter:counter+quantity]),200)
    return res


app.run(debug='True')