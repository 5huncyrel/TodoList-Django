# React + Vite


## Backend API Endpoints


### 1. Fetch All Tasks
- **URL**: `/api/todos/fetch/`
- **Method**: `GET`

### 2. Fetch a single task by ID
- **URL**: `api/todos/<int:pk>/fetch/`
- **Method**: `GET`

### 3. Create a Task
- **URL**: `api/todos/create/`
- **Method**: `POST`

### 4. Update a task by ID
- **URL**: `api/todos/<int:pk>/update/`
- **Method**: `PUT`

### 5. DELETE a task by ID
- **URL**: `api/todos/<int:pk>/delete/`
- **Method**: `DELETE`



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
