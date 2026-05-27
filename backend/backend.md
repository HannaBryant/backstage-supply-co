# Backend — Backstage Supply Co.

A lightweight REST API built with Flask and PostgreSQL, serving product inventory data for the Backstage Supply Co. frontend.

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Framework  | Flask 3.1.3         |
| Database   | PostgreSQL (psycopg2 2.9.12) |
| CORS       | flask-cors 6.0.2    |
| Config     | python-dotenv 1.2.2 |

---

## Project Structure

```
backend/
├── app.py          # Flask app and route definitions
├── database.py     # DB connection and schema initialization
├── requirements.txt
└── .env            # Environment variables (not committed)
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following keys:

```env
DB_HOST=       # PostgreSQL host (e.g. localhost)
DB_PORT=       # PostgreSQL port (e.g. 5432)
DB_NAME=       # Database name
DB_USER=       # Database user
DB_PASS=       # Database password
```

---

## Database

### Schema

`backstage_supply`

### Table: `products`

| Column     | Type            | Constraints          |
|------------|-----------------|----------------------|
| `id`       | SERIAL          | PRIMARY KEY          |
| `name`     | VARCHAR(100)    | NOT NULL             |
| `price`    | DECIMAL(10, 2)  | NOT NULL             |
| `quantity` | INTEGER         | NOT NULL             |

The schema and table are created automatically on startup via `init_db()` in `database.py` using `CREATE SCHEMA IF NOT EXISTS` and `CREATE TABLE IF NOT EXISTS`, so no manual migration is needed.

---

## Running the Server

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The server runs on `http://0.0.0.0:5000` with debug mode enabled.

---

## API Endpoints

Base URL: `http://localhost:5000`

---

### GET `/products`

Returns all products ordered by `id` ascending.

**Response `200`**
```json
[
  {
    "id": 1,
    "name": "Example Product",
    "price": 19.99,
    "quantity": 42
  }
]
```

---

### POST `/products`

Creates a new product.

**Request Body**
```json
{
  "name": "Example Product",
  "price": 19.99,
  "quantity": 42
}
```

**Response `201`**
```json
{ "message": "Product created" }
```

---

### PUT `/products/<id>`

Updates an existing product by `id`.

**Request Body**
```json
{
  "name": "Updated Name",
  "price": 24.99,
  "quantity": 10
}
```

**Response `200`**
```json
{ "message": "Product updated" }
```

---

### DELETE `/products/<id>`

Deletes a product by `id`.

**Response `200`**
```json
{ "message": "Product deleted" }
```
