
# 📦 CollectTrack - Home Inventory Management System

> Manage your personal collections easily! Books 📚, Video Games 🎮, Vinyl Records 🎵 – all in one place, now with Data Management and Auto-Backup features!

---

## 🖥️ Project Overview

**CollectTrack** is a simple, modern React web application designed to help users organize, track, and manage their growing home collections. Now upgraded with auto-save, backup, and import/export capabilities for total data control!

Features include:
- Dashboard overview with collection statistics
- Manage items (books, games, vinyl records)
- Track loans (borrowed items)
- Auto-save and manual data backups
- Export and import collection data
- View storage statistics and reset data

Built for everyday collectors who want a fast, easy-to-use, and reliable system!

---

## 🚀 Tech Stack

| Technology  | Purpose            |
|:------------|:-------------------|
| React        | Frontend Framework |
| React Router | Page Routing       |
| Context API / State Management | Manage App Data |
| Chart.js + react-chartjs-2 | Visual Charts |
| LocalStorage | Save data persistently |
| TailwindCSS or CSS Modules | Styling |

---

## 📂 Project Structure

```
home-inventory-system/
├── public/
│   ├── index.html
│
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Dashboard.css
│   │   ├── ItemsList.js
│   │   ├── ItemsList.css
│   │   ├── LoansList.js
│   │   ├── LoansList.css
│   │   ├── NewItemForm.js
│   │   ├── NewLoanForm.js
│   │   ├── Modal.css
│   │   ├── DataManagement.js
│   │   ├── DataManagement.css
│   │
│   ├── pages/
│   │   ├── DataManagementPage.js
│   │   ├── DataManagementPage.css
│   │
│   ├── services/
│   │   └── DataService.js
│   │
│   ├── data/
│   │   └── initialData.js
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
└── README.md
```

---

## ⚙️ Installation and Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/collecttrack.git
cd collecttrack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

The app should now be running on:
```
http://localhost:3000
```

---

## 📸 Key Screens

| Screen | Description |
|:-------|:------------|
| Dashboard | Overview of collection |
| My Collection | List and manage all items |
| Loans | View who borrowed what |
| Data Management | Export, Import, and Manage your data backups |

---

## ✍️ Author

Built with 💙 by **[Ashen Etugala]**  
🔗 [LinkedIn](https://www.linkedin.com/in/ashen-etugala/)

---

## 📃 License

This project is licensed under the MIT License.

---

# 🎯 Final Notes

CollectTrack now not only helps you manage your collection but **protects your data automatically** — giving you full control with backup and restore features.

Happy Collecting! 🎉
