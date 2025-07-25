# 🎬 Vue Movie Rental System - Comerc Challenge

[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel)](https://vue-movie-rental.vercel.app/)

## 🔗 Access the App

👉 [Movie Rental System on Vercel](https://vue-movie-rental.vercel.app/)

**Demo Credentials:**  
📋 Document: `12345678901`  
🔑 Password: `admin123`


## Features

A movie rental management system built with Vue 3 and TypeScript, implementing all requirements from a technical challenge.

### 👤 User  (User Management)
- Create, edit, and delete users
- Login/logout with session persistence
- Password validation and secure handling
- Only active users can log in

### 👥 Customer
- Register customers with **ViaCEP** integration
- CPF validation and address auto-completion
- Customer status management (active/inactive)

### 🎬 Movies View
- Search movies by title via **OMDb API**
- Filter by release year
- Display movie details in responsive cards

### 📦 Rental View
- Create new rentals by associating a customer with a movie
- Know exactly which customer rented which movie
- Track rental status (rented or returned)
- Prevent new rentals if the customer has a movie not yet returned
## 🛠️ Technical Stack

### Frontend
- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS 3
- Vue Router
- VueUse (Utility hooks)


### APIs & Services
- [OMDb API](https://www.omdbapi.com/) - Movie database
- [ViaCEP API](https://viacep.com.br/) - Brazilian address lookup

### Development Tools
- Vite (Build Tool)
- ESLint + Prettier (Code Quality)


## 📦 Installation

### Prerequisites
- Node.js v18+
- npm or yarn

```bash
# Clone repository & install 
git clone https://github.com/KakaSena/vue-movie-rental.git
cd vue-movie-rental


```bash
git clone https://github.com/KakaSena/vue-movie-rental.git
cd vue-movie-rental
npm install
npm run dev 
```

### 🚧 Future Improvements
- Testing
- Dockerization
- Responsiveness
