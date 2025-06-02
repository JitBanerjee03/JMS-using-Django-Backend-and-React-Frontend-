# Journal Management System – Monorepo

This repository contains a full-stack Journal Management System, including a Django backend and multiple React frontends for different user roles.

---

## 📦 Project Structure

```
readme.md
Area_Editor/
Associate Editor/
Author_Frontend/
Django Project using mysql/
Editor in chief/
Journal_Management_System/
Reviewer_Frontend/
```

- **Django Project using mysql/**: Main backend project (Django + MySQL)
- **Area_Editor/**, **Associate Editor/**, **Author_Frontend/**, **Editor in chief/**, **Reviewer_Frontend/**: React frontends for each user role

---

## 🛠️ Getting Started

### 1. Clone the Repository

```sh
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend Setup (Django)

1. Create and activate a virtual environment:
    ```sh
    python -m venv venv
    # Windows:
    venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
    ```

2. Install dependencies:
    ```sh
    pip install -r "Django Project using mysql/requirements.txt"
    ```

3. Configure environment variables and database settings in `Django Project using mysql/Journal_Management_system/`.

4. Apply migrations:
    ```sh
    python "Django Project using mysql/Journal_Management_system/manage.py" migrate
    ```

5. Collect static files:
    ```sh
    python "Django Project using mysql/Journal_Management_system/manage.py" collectstatic
    ```

6. Run the development server:
    ```sh
    python "Django Project using mysql/Journal_Management_system/manage.py" runserver
    ```

---

### 3. Frontend Setup (React)

Each frontend (e.g., `Area_Editor/`, `Author_Frontend/`, etc.) is a separate React app using Vite.

For each frontend:

```sh
cd <Frontend_Directory>
npm install
npm run dev
```

---

## 📚 More Information

- Backend dependencies: See [`Django Project using mysql/requirements.txt`](Django%20Project%20using%20mysql/requirements.txt)
- Each frontend contains its own `README.md` for further details.

---

## 📝 License

See individual files for license information.

---