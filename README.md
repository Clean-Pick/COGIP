# **COGIP**

COGIP is a web application designed to modernize the accounting workflow and rescue Jean-Christian Ranu from the nightmare of outdated software and endless Excel sheets.

This team project challenges us to consolidate our full-stack development skills while delivering a practical and efficient accounting solution.

## 📌 Features

✔️ **User Registration** – Allow users to create an account.<br>
✔️ **Authentication** – Secure login and logout functionality.<br>
✔️ **Invoices List Page** – View all invoices with filtering option.<br>
✔️ **Companies List Page** – Display all registered companies with filtering option.<br>
✔️ **Contacts List Page** – View all contacts with filtering option.<br>
✔️ **Invoice Details Page** – View detailed information about a specific invoice.<br>
✔️ **Company Details Page** – Access company-specific details and related contacts & invoices.<br>
✔️ **Contact Details Page** – View individual contact information.<br>
✔️ **Admin Dashboard** – View statistics, create invoices, companies, and contacts.<br>
✔️ **REST API Backend** – Expose secure API endpoints for data management.<br>

## 💻 Technologies Used

| Technology   | Purpose |
|-------------|---------|
| **React.js (Vite.js)** | Frontend Framework for building the interactive UI|
| **Node.js & Express** | Backend API for handling requests and routes |
| **MySQL** | Relational database for storing application data |
| **Tailwind CSS** | CSS framework for styling |

## 🛠️ Setup

### 1. Prerequisites

1. Before starting, make sure you have Node.js and npm installed:

```bash
node -v
npm -v
```
If Node.js and npm are not installed, download and install them from [Node.js Official Website](https://nodejs.org/fr) (npm is automatically installed when you install Node.js).

2. Clone the repository:
```bash
git clone git@github.com:HakimBaidouri/COGIP.git
```

### 2. Backend setup
1. Once the repository is cloned, move into the backend folder:
```bash
cd COGIP/backend
```
2. Install dependencies:
```bash
npm install
```
3. Modify the .env file 
```env
DB_HOST=your_local_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=cogip
```
4. Configure your database: following thes steps in this [file](/backend/public/db/readme.md)<br><br>

5. Start the backend server: 
```bash
node index.mjs
```
The server should now be running at http://localhost:3001.

### 3. Frontend setup
1. Navigate to the frontend folder:
```bash
cd ../frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the React development server in another terminal :
```bash
npm run dev
```
The frontend should now be running at http://localhost:5173.

## 📋 API Documentation

### Users

- POST /cogip/api/register - register a user
- PUT /cogip/api/register/:id - update a user
- DELETE /cogip/register/:id - delete a user
- GET /cogip/api/login - get user's infos

### Companies

- ```GET cogip/api/company``` - Get all companies
- ```GET cogip/api/company/:id``` - Get a single company with contacts and invoices related
- ```POST cogip/api/company``` - Create a new company
- ```PUT cogip/api/company/:id``` - Update a company
- ```DELETE cogip/api/company/:id``` - Delete a company

### Invoices

- ```GET cogip/api/invoice``` - Get all invoices
- ```GET cogip/api/invoice/:id``` - Get a single invoice
- ```POST cogip/api/invoice``` - Create a new invoice
- ```PUT cogip/api/invoice/:id``` - Update a invoice
- ```DELETE cogip/api/invoice/:id``` - Delete a invoice

### Contacts

- ```GET cogip/api/contact``` - Get all contacts
- ```GET cogip/api/contact/:id``` - Get a single contact
- ```POST cogip/api/contact``` - Create a new contact
- ```PUT cogip/api/contact/:id``` - Update a contact
- ```DELETE cogip/api/contact/:id``` - Delete a contact

## Little video
![Aperçu de la vidéo](cogipVideo.gif) <br>
Sorry about the quality, just to give you an idea 😢

## ✨ Collaborators

The amazing team behind this project:
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/Clean-Pick">
          <img src="https://avatars.githubusercontent.com/u/180029981?v=4" width="100px;" alt=""/>
        </a><br />
        <sub><b><a href="https://github.com/Clean-Pick">Benjamin W</a></b></sub><br />
        <span>Frontend</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/Nora-H01">
          <img src="https://avatars.githubusercontent.com/u/180020228?v=4" width="100px;" alt=""/>
        </a><br />
        <sub><b><a href="https://github.com/Nora-H01">Nora H.</a></b></sub><br />
        <span>Frontend</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/thibautjulien">
          <img src="https://avatars.githubusercontent.com/u/177143711?v=4" width="100px;" alt=""/>
        </a><br />
        <sub><b><a href="https://github.com/thibautjulien">Thibaut Julien</a></b></sub><br />
        <span>Frontend</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/HakimBaidouri">
          <img src="https://avatars.githubusercontent.com/u/180289761?v=4" width="100px;" alt=""/>
        </a><br />
        <sub><b><a href="https://github.com/HakimBaidouri">Hakim Baidouri</a></b></sub><br />
        <span>Backend</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/vincianenahimana">
          <img src="https://avatars.githubusercontent.com/u/20559316?v=4" width="100px;" alt=""/>
        </a><br />
        <sub><b><a href="https://github.com/vincianenahimana">Vinciane Nahimana</a></b></sub><br />
        <span>Backend</span>
      </td>
    </tr>
  </tbody>
</table>
