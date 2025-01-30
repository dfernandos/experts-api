# Experts API

## Description
This is a simple API developed in Node.js using Express. The API provides an endpoint to filter experts based on recency (time in months since their last job).

## Technologies Used
- Node.js
- Express
- Cors

## Installation
To run this project, follow the steps below:

1. Clone this repository:
   ```sh
   git clone git@github.com:dfernandos/experts-api.git
   cd experts-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   node server.mjs
   ```
   The server will run on port `3000`.

## Endpoints

### **1. Filter Experts**
**Route:** `POST /experts`

**Request Body:**
```json
{
  "filters": {
    "status": [],
    "groups": [],
    "recency": [">12"]
  }
}
```

**Recency Filter Format:**
- `">12"`  → Returns experts who last worked more than 12 months ago.
- `"[12,24]"`  → Returns experts who last worked between 12 and 24 months ago.
- `"<6"`  → Returns experts who last worked within the last 6 months.

**Example Response:**
```json
{
  "experts": [
    {
      "advisorName": "Jane Smith",
      "recency": 18
    }
  ]
}
```

### **2. List All Experts**
**Route:** `POST /all-experts`

**Request Body:** (no parameters required)
```json
{}
```

**Example Response:**
```json
{
  "experts": [
    { "advisorName": "John Doe", "lastWorkedDate": "2023-01-15" },
    { "advisorName": "Jane Smith", "lastWorkedDate": "2022-06-20" },
    { "advisorName": "Alice Johnson", "lastWorkedDate": "2021-12-10" },
    { "advisorName": "Daniel Oliveira", "lastWorkedDate": "2025-01-10" }
  ]
}
```
