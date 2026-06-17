LIVE URL : https://capstone-hanna.pathway4.click/


# Backstage Supply Co.

Full-stack product inventory management application for a fictional rock and roll supply company. Built with a React frontend served through a Flask backend, deployed on AWS EC2.

## Tech Stack

### Backend
- Python 3.12
- Flask 3.1.3
- PostgreSQL with psycopg2-binary
- flask-cors for cross-origin support
- python-dotenv for environment configuration
- Gunicorn as the production WSGI server
- Nginx as reverse proxy

### Frontend
- React 18
- Vite 5 (build tool)
- Axios (HTTP client)
- @n8n/chat (AI chatbot widget)
- Custom CSS with gothic dark theme

## Features

- Create, read, update, and delete products
- Dynamic inventory table with live data from PostgreSQL
- Add products via an inline form
- Edit products through a modal dialog
- Smoke dissolve animation on product deletion
- AI-powered chatbot integrated via n8n automation webhook
- Responsive design for all screen sizes
- Dark gothic UI with crimson, orange, and yellow flame accents

## Project Structure

```
backstage-supply-co/
├── backend/
│   ├── app.py              # Flask application and API routes
│   ├── database.py         # PostgreSQL connection and schema init
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Database credentials (not committed)
│   ├── templates/
│   │   └── index.html      # Production frontend entry point
│   └── static/
│       └── assets/         # Built JS and CSS bundles
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── App.css             # Full gothic theme stylesheet
        ├── index.css           # Global resets
        ├── main.jsx            # React entry point
        ├── pages/
        │   └── ProductsPage.jsx
        ├── components/
        │   ├── ProductForm.jsx
        │   ├── ProductTable.jsx
        │   ├── EditProductModal.jsx
        │   └── Chatbot.jsx
        └── services/
            └── productService.js
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /products | Fetch all products |
| POST | /products | Create a new product |
| PUT | /products/:id | Update a product by ID |
| DELETE | /products/:id | Delete a product by ID |

## Database Schema

Schema: `backstage_supply`

Table: `products`

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| price | DECIMAL(10,2) | NOT NULL |
| quantity | INTEGER | NOT NULL |

## Environment Variables

Create a `.env` file in `backend/` with:

```
DB_HOST=your-host
DB_PORT=5432
DB_NAME=your-database
DB_USER=your-user
DB_PASS=your-password
```

## Running Locally

1. Install Python dependencies: `pip install -r backend/requirements.txt`
2. Install frontend dependencies: `cd frontend && npm install`
3. Build the frontend: `npm run build`
4. Copy `frontend/dist/index.html` to `backend/templates/`
5. Copy `frontend/dist/assets/` and `frontend/dist/vite.svg` to `backend/static/`
6. Run: `cd backend && python app.py`
7. Open http://localhost:5000

## Production Deployment (AWS EC2)

1. Clone the repo to EC2
2. Set up a Python virtual environment and install dependencies
3. Configure `.env` with your RDS or PostgreSQL credentials
4. Run with Gunicorn: `gunicorn --bind 0.0.0.0:5000 app:app`
5. Set up Nginx as a reverse proxy
6. Use Certbot for SSL
7. Create a systemd service for auto-restart


#### What I learned:
- How to build and deploy full-stack applications end-to-end
- How to design scalable database systems
- How to integrate AI automation into real applications
- How frontend, backend, and cloud systems connect
- How to troubleshoot production deployment issues
  
