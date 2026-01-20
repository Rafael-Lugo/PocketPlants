# 🌱 PocketPlants

**PocketPlants** is a full-stack plant management web application built with **Next.js**.
It helps users keep track of important plant care information such as **watering needs**, **fertilizing seasons**, and **light requirements**, all in one intuitive and visually guided interface.

Users can upload their own plants, manage favorites, and organize their plant collection efficiently.

---

## ✨ Features

* 🌱 Create, edit, and delete plants
* ⭐ Mark plants as favorites
* 🖼 Upload and display plant images (Cloudinary integration)
* 💧 Manage watering levels and light requirements
* 🌦 Select multiple fertilizing seasons using visual icons
* 🔍 Search plants by name
* 📱 Fully responsive design (mobile & desktop)
* 🔔 Visual feedback after actions (e.g. successful creation)

---

## 🎯 Project Goal

The goal of **PocketPlants** is to **simplify plant care** by making complex information easy to understand and visually accessible.
The app is designed for **beginners** as well as **plant enthusiasts** who want to manage their plants digitally and reliably.

---

## 🛠 Tech Stack

### Frontend

* React 18
* Next.js 13
* Styled Components
* JavaScript (ES6+)

### Backend

* Next.js API Routes
* MongoDB
* Mongoose

### Media & Data

* Cloudinary (image uploads)
* SWR (data fetching)

### Testing

* Jest
* React Testing Library

### Deployment

* Vercel

---

## 📦 Data Model

### Plant

Each plant is stored as a MongoDB document and contains all relevant care information.

**Typical fields:**

* `name` – plant name
* `image` – image URL
* `description` – notes and description
* `watering` – watering level
* `light` – light requirements
* `fertiliserSeason` – array of seasons
* `isFavorite` – favorite status

---

## 🔌 Database Connection

The database connection is handled via a centralized helper (`connect.js`) using **Mongoose**.
A singleton pattern is used to prevent multiple database connections during development and hot reloads in Next.js.

---

## 📁 Project Structure

```txt
├── pages
│   ├── index.js                # Plant list (home)
│   ├── my-plants.js            # User plant overview
│   ├── create-plant.js         # Create plant form
│   ├── plants
│   │   ├── [id].js             # Plant details
│   ├── _app.js                 # Global app setup
│   ├── _document.js            # Custom document
├── components
│   ├── Navigation
│   ├── PlantList
│   ├── PlantCard
│   ├── PlantForm
│   ├── PlantDetails
│   ├── Searchbar
│   └── styles
├── models
│   └── Plant.js
├── lib
│   └── connect.js
├── public
├── styles.js                   # Global styles
├── next.config.js
├── package.json
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js
* MongoDB (local or cloud, e.g. MongoDB Atlas)

---

### Installation

```bash
git clone <repository-url>
cd plant-pal
npm install
```

---

### Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### Run Development Server

```bash
npm run dev
```

The app will be available at:
👉 `http://localhost:3000`

---

## 🧪 Testing

Run all component tests with:

```bash
npm test
```

---

## 📦 Available Scripts

```bash
npm run dev     # start development server
npm run build   # build production app
npm run start   # start production server
npm run lint    # run ESLint
npm test        # run Jest tests
```

---

## 🧠 Design & Architecture Notes

* Clear separation of **logic and styling** using Styled Components
* Reusable UI components (Cards, Forms, Navigation)
* File-based routing with **dynamic routes**
* Scalable and maintainable structure

---

## 🚀 Deployment

The project is optimized for deployment on **Vercel**.

```bash
npm run build
```

Push to GitHub and connect the repository to Vercel.

---

## 👤 Author

**Rafael Lugo**
Plant Pal App
Fullstack Next.js project with focus on **UX, component architecture, and clean code**.

## License

© 2026 Rafael Lugo. All rights reserved.

This project is presented as a **personal portfolio project**.

The source code and all visual assets — including but not limited to
logos, icons, illustrations, infographics, UI/UX design, and graphical styles —
are the **intellectual property of the author**.

This repository is provided **for viewing and evaluation purposes only**.
Copying, modifying, redistributing, or using any part of this project
without **explicit written permission** from the author is not permitted.

