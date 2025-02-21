# Bajaj Finserv Health Dev Challenge (Qualifier 1)

## Backend API
This is the backend implementation for the Bajaj Finserv Health Dev Challenge.

### **API Endpoints**
1. **GET /bfhl**
   - Returns a JSON response with `{ operation_code: 1 }`.

2. **POST /bfhl**
   - Accepts JSON input containing an array of values (numbers and alphabets).
   - Responds with:
     - `is_success`: Status of operation
     - `user_id`: `khushi_raj_shekhar_22092003`
     - `email`: `khushirajshekhar0709@gmail.com`
     - `roll_number`: `22BCS17009`
     - `numbers`: Extracted numbers from input
     - `alphabets`: Extracted alphabets from input
     - `highest_alphabet`: Alphabet that comes last in the A-Z order

### **Setup Instructions**
1. Clone the repository:
   ```sh
   git clone <repo_url>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the server:
   ```sh
   npm start
   ```
4. The server runs on `http://localhost:3000` by default.

### **Deployment**
- Hosted on Render/Vercel/Heroku (Update with actual URL).
- API Base URL: `https://your-deployment-url.com/bfhl`

---
© 2025 Khushi Raj Shekhar