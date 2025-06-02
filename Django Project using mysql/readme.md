# Django Journal Management System

This project is a Journal Management System built with Django and MySQL.

---

## 🚀 Step-by-Step Setup Guide

### 1. **Set Up a Virtual Environment**

**Windows:**
```sh
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```sh
python3 -m venv venv
source venv/bin/activate
```

### 2. **Install Dependencies**
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

### 3. **Configure Environment Variables**
Create a `.env` file in `Journal_Management_system/` and add your secrets (DB credentials, Django secret key, etc).

### 4. **Configure the Database**
- Ensure MySQL is installed and running.
- Update your Django settings to point to your MySQL database.

### 5. **Apply Migrations**

**Windows:**
```sh
python Journal_Management_system/manage.py migrate
```

**macOS/Linux:**
```sh
python3 Journal_Management_system/manage.py migrate
```

### 6. **Collect Static Files**

**Windows:**
```sh
python Journal_Management_system/manage.py collectstatic
```

**macOS/Linux:**
```sh
python3 Journal_Management_system/manage.py collectstatic
```

### 7. **Run the Development Server**

**Windows:**
```sh
python Journal_Management_system/manage.py runserver
```

**macOS/Linux:**
```sh
python3 Journal_Management_system/manage.py runserver
```

---

## 📦 Project Structure

- `Journal_Management_system/` – Main Django project folder
- `AreaEditor/`, `AssociateEditor/`, `author/`, `Editor_Chief/`, `journal/`, `reviewer/` – Django apps
- `media/`, `static/`, `templates/` – Media, static, and template files

---

For more details, see the [Project Dependencies](Journal_Management_system/#%20%F0%9F%93%A6%20Project%20Dependencies.md) file.