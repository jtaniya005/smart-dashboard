# LeadCRM – InstaWeb Labs Assignment

A full-stack **Lead Management CRM** built with React.js, Node.js, Express.js, and MongoDB.

---

## 📁 Project Structure

```
lead-crm/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/leadController.js
│   │   ├── middleware/validate.js
│   │   ├── middleware/errorHandler.js
│   │   ├── models/Lead.js
│   │   ├── routes/leadRoutes.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── components/LeadForm.js
    │   ├── components/Modal.js
    │   ├── components/StatusBadge.js
    │   ├── hooks/useLeads.js
    │   ├── pages/Dashboard.js
    │   ├── pages/Leads.js
    │   ├── services/api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── .env.example
    └── package.json
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/lead-crm.git
cd lead-crm
```

---

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URI

npm run dev   # Development (nodemon)
# OR
npm start     # Production
```

Backend runs on: `http://localhost:5000`

---

### 3. Frontend Setup
```bash
cd frontend
npm install

cp .env.example .env
# REACT_APP_API_URL=http://localhost:5000/api

npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | /api/leads            | Get all leads (paginated, filterable) |
| POST   | /api/leads            | Create new lead         |
| GET    | /api/leads/stats      | Get lead statistics     |
| GET    | /api/leads/:id        | Get single lead         |
| PUT    | /api/leads/:id        | Update lead             |
| DELETE | /api/leads/:id        | Delete lead             |

### Query Parameters for GET /api/leads
| Param   | Example         | Description              |
|---------|-----------------|--------------------------|
| search  | ?search=rahul   | Search name/email/company|
| status  | ?status=New     | Filter by status         |
| sortBy  | ?sortBy=name    | Sort field               |
| order   | ?order=asc      | asc or desc              |
| page    | ?page=2         | Page number              |
| limit   | ?limit=10       | Results per page         |

---

## ✅ Features

- **Create / Read / Update / Delete** leads
- **Search** by name, email, or company
- **Filter** by status (New, Contacted, Qualified, Converted, Lost)
- **Sort** by name, company, or date
- **Pagination** (8 leads per page)
- **Statistics Dashboard** with conversion funnel
- **Responsive design** (mobile-friendly)
- **Form validation** (frontend + backend)
- **Debounced search**
- **Expandable rows** with quick status change

---

## 🛠 Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React.js, Axios             |
| Backend   | Node.js, Express.js         |
| Database  | MongoDB, Mongoose           |
| Validation| express-validator           |

---

## 📬 Submission

Submitted to: hr@websites.co.in  
Deadline: 07 June 2026
