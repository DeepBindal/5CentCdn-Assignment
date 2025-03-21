# 🛠️ Dynamic Dashboard with Authentication and API Integration

## 🚀 **Project Overview**
This project is a fully functional **Dynamic Dashboard** built with:
- **Next.js (App Router)** for the frontend framework.
- **Tailwind CSS** for responsive styling.
- **Mock JWT Authentication** for login/logout flow.
- **API Integration** with `https://jsonplaceholder.typicode.com/posts` to display dynamic data with filtering and pagination.
- **Shadcn/ui** components for modern and sleek UI elements.

---

## 🔥 **Features**

### ✅ **Authentication Flow**
- **Login Page** with form validation:
  - Email format check.
  - Password minimum 6 characters.
- On successful login:
  - Stores a mock JWT token in `localStorage`.
  - Redirects to the **Dashboard**.
- On logout:
  - Clears the token.
  - Redirects to the **Login Page**.
- **Route Protection**:
  - Redirects to the **Login Page** if no token is present.

### 📊 **Dashboard Page**
- **Layout Components:**
  - **Header**: Displays user info and a logout button.
  - **Sidebar**: Contains navigation links (Dashboard, Settings, Profile).
  - **Main Content**: 
    - Displays API data in a table.
    - Filtering by title or ID.
    - Pagination with 5 posts per page.
- **Error Handling:**
  - Displays an error message if the API call fails.
- **Loading States:**
  - Shows a spinner while fetching data.

### 🌐 **API Integration**
- Uses `getServerSideProps()` to fetch initial data on the server-side.
- Uses `useEffect()` and `useState()` for client-side filtering and pagination.

### 🎨 **Styling**
- **Tailwind CSS** for responsive design.
- Hover effects and transitions for a polished UI.
- **Dark Mode Toggle** (Bonus feature).

---

## 🛠️ **Tech Stack**
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** Mock JWT Token
- **API:** JSONPlaceholder (`https://jsonplaceholder.typicode.com/posts`)
- **UI Library:** Shadcn/ui components

---

## 🛠️ **Installation & Setup**

1. **Clone the Repository**
```bash
  git clone <repository_url>
  cd dynamic-dashboard
2. **Install Dependencies**
```bash
  npm install
3. **Run the Development Server**
```bash
  npm run dev
