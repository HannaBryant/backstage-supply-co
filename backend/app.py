from flask import Flask, request, jsonify
from flask_cors import CORS

from database import get_connection, init_db

app = Flask(__name__)
CORS(app)

init_db()


SCHEMA = "backstage_supply"
TABLE = "products"


@app.route("/products", methods=["GET"])
def get_products():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(f"SELECT * FROM {SCHEMA}.{TABLE} ORDER BY id ASC;")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify([
        {
            "id": r[0],
            "name": r[1],
            "price": float(r[2]),
            "quantity": r[3]
        }
        for r in rows
    ]), 200


@app.route("/products", methods=["POST"])
def create_product():

    data = request.get_json()

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(f"""
        INSERT INTO {SCHEMA}.{TABLE} (name, price, quantity)
        VALUES (%s, %s, %s);
    """, (
        data["name"],
        data["price"],
        data["quantity"]
    ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Product created"}), 201

@app.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):

    data = request.get_json()

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(f"""
        UPDATE {SCHEMA}.{TABLE}
        SET name=%s,
            price=%s,
            quantity=%s
        WHERE id=%s;
    """, (
        data["name"],
        data["price"],
        data["quantity"],
        product_id
    ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Product updated"}), 200

@app.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(f"""
        DELETE FROM {SCHEMA}.{TABLE}
        WHERE id=%s;
    """, (product_id,))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Product deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)