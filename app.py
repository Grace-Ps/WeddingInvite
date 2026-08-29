from flask import Flask, render_template

app = Flask(__name__)

WEDDING = {
    "bride": "Grace",
    "groom": "Saurabh",
    "date": "14 November 2026",
    "date_iso": "2026-11-14T11:00:00+05:30",
    "time": "11 AM",
    "venue": "Carmel Chittor Road",
    "city": "Ernakulam",
    "maps_url": "https://maps.app.goo.gl/AtmE4XDXE1vgLMLd7",
    "music_url": "https://www.youtube.com/watch?v=IWOPRFRNj3ga",
}


@app.route("/")
def invitation():
    return render_template("index.html", wedding=WEDDING)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
