# Expense Tracker

## Overview

The Expense Tracker application provides a comprehensive solution for tracking expenses, managing budgets, and categorizing expenses. It leverages the mentioned tech stack to deliver an efficient and user-friendly experience for managing personal finances

## Getting Started

    git clone <repo link>
    cd keyboard_eccomrce

### Frontend

    cd front-end
    npm install
    npm run dev
    frontend server will run at http://locahost:5173

### Backend

    open new terminal
    cd back-end
    npm install
    npm run dev
    backend server will run at http://locahost:1234

## Tech Stack

    Typescript
    React
    Reactquery
    Node.js
    Express.js
    Prisma
    Postgresql
    Webpack

## Features

### User Authentication

- Register

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842158/md/expense_tracker/register.png)

  Users can create a new account by providing their necessary information, such as username, email, and password. The registration process securely stores their credentials for future login.

- Login

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842158/md/expense_tracker/login.png)

  Registered users can log into the application using their credentials. Upon successful authentication, they gain access to their personalized dashboard and can start managing their expenses, budgets, and categories.

### DashBoard Page

- Line Chart And Card

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842779/md/expense_tracker/line%20chart.png)

  The Line Chart visually represents the user's expense data over time. It provides a graphical representation of how expenses have changed or fluctuated over a specific period. This helps users track their spending patterns and identify trends.

- Doughnut Chart

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842159/md/expense_tracker/doughnut%20chart.png)

The Doughnut Chart provides a clear and concise breakdown of the user's expenses by category. It visualizes the proportion of expenses allocated to different categories using a circular chart with segments. This allows users to quickly understand their expense distribution and identify which categories consume the most of their budget.

- Most Recent Expenses

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842159/md/expense_tracker/recent%20dashboard.png)

  Display the 10 most recent expense.

### Expense Page

- View Expense

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842158/md/expense_tracker/Expense%20List.png)

Users can easily view their expenses, budgets, and categories in a clear and organized manner.

- Search/Filter

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842158/md/expense_tracker/filter%202%20expense.png)

  Users can quickly search for specific expenses, budgets, or categories by using search functionality.

- Add New Expense

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842160/md/expense_tracker/add%20expense.png)

Users can effortlessly add new expenses to keep track of their financial transactions.

- Update/Edit Expense

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842159/md/expense_tracker/update%20expense.png)

  Users can easily modify and update expense details, ensuring accurate records.

- Delete Existing Expense

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686842160/md/expense_tracker/delete%20expense.png)

Users have the ability to delete any unwanted or no longer relevant expenses.

### Budget Page

- View Budget

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686843531/md/expense_tracker/budget%20list.png)

  Users can see a list of their budgets.

- Search/Filter

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686843530/md/expense_tracker/filter%20budgets.png)

  Users can search for specific budgets using keywords or filters.

- Budget Details

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686843531/md/expense_tracker/budget%20details.png)

  View the full details of a budget.

- Add new budgets

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686843531/md/expense_tracker/create%20budgets.png)

  Users can create new budgets by providing the necessary details.

- Update/edit budget details

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686843531/md/expense_tracker/update%20budgets.png)

  Users can modify budget information such as name, amount

- Delete existing budgets

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686843971/md/expense_tracker/delete%20budget.png)

  Users can remove budgets they no longer need.

- View and remove budget expenses expenses

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686843531/md/expense_tracker/budget%20expense.png)

  Users can view or remove the expenses associated with each budget.

### Category Page

- View Category

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686844195/md/expense_tracker/Screen_Shot_2023-06-15_at_11.48.42_PM_z2km6k.png)

  Users can easily view their existing expense categories.

- Search/Filter

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686844196/md/expense_tracker/Screen_Shot_2023-06-15_at_11.48.49_PM_vgfbba.png)

  Users can search for specific category using keywords or filters.

- Budget Details

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686844196/md/expense_tracker/Screen_Shot_2023-06-15_at_11.48.57_PM_hmrkdk.png)

  View the full details of a category.

- Add new category

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686844196/md/expense_tracker/Screen_Shot_2023-06-15_at_11.48.53_PM_qejg6p.png)

  Users have the ability to create new expense categories to organize their expenses.

- Update/edit category details

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686844196/md/expense_tracker/Screen_Shot_2023-06-15_at_11.49.00_PM_gajgjn.png)

  Users can modify and update category details, such as the name or description.

- Delete existing category

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686844196/md/expense_tracker/Screen_Shot_2023-06-15_at_11.49.15_PM_wzgteu.png)

  Users can remove category they no longer need.

- View and remove category expenses expenses

  ![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686844196/md/expense_tracker/Screen_Shot_2023-06-15_at_11.49.11_PM_j5amgz.png)

  Users can view or remove the expenses associated with each category.

## Responsive

![Image Alt Text](https://res.cloudinary.com/dkarsw8bs/image/upload/v1686846170/md/expense_tracker/Screen_Shot_2023-06-16_at_12.22.20_AM_osotog.png)
