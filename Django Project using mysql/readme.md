# Django Journal Management System

This project is a Journal Management System built with Django and MySQL.

---

## 🚀 Step-by-Step Setup Guide

### 1. **Clone the Repository**
```sh
git clone <your-repo-url>
cd "Django Project using mysql"
```

### 2. **Set Up a Virtual Environment**
```sh
python -m venv venv
venv\Scripts\activate
```

### 3. **Install Dependencies**
All required dependencies are listed in [`Journal_Management_system/# 📦 Project Dependencies.md`](Journal_Management_system/#%20%F0%9F%93%A6%20Project%20Dependencies.md).

Install them with:
```sh
pip install -r requirements.txt
```

**Main dependencies include:**
- Django
- djangorestframework
- django-cors-headers
- djangorestframework_simplejwt
- mysqlclient
- pillow
- PyJWT

See the full list in [`Journal_Management_system/# 📦 Project Dependencies.md`](Journal_Management_system/#%20%F0%9F%93%A6%20Project%20Dependencies.md).

### 4. **Configure Environment Variables**
Create a `.env` file in `Journal_Management_system/` and add your secrets (DB credentials, Django secret key, etc).

### 5. **Configure the Database**
- Ensure MySQL is installed and running.
- Update your Django settings to point to your MySQL database.

### 6. **Apply Migrations**
```sh
python Journal_Management_system/manage.py migrate
```

### 7. **Collect Static Files**
```sh
python Journal_Management_system/manage.py collectstatic
```

### 8. **Run the Development Server**
```sh
python Journal_Management_system/manage.py runserver
```

---

## 📦 Project Structure

- `Journal_Management_system/` – Main Django project folder
- `AreaEditor/`, `AssociateEditor/`, `author/`, `Editor_Chief/`, `journal/`, `reviewer/` – Django apps
- `media/`, `static/`, `templates/` – Media, static, and template files

---

For more details, see the [Project Dependencies](Journal_Management_system/#%20%F0%9F%93%A6%20Project%20Dependencies.md) file.