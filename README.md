# Task Manager

A responsive task management application built with HTML, JavaScript, Tailwind CSS, and MockAPI.

The application provides a simple Kanban-style interface for organizing tasks by status, managing priorities, and tracking deadlines.

## Features

- **Create Tasks:** Add tasks with a title, description, due date, priority, and status.
- **Edit & Delete:** Update existing tasks or remove them.
- **Search:** Find tasks by title or description.
- **Filter:** Filter tasks by priority and status.
- **Status-Based Organization:** Organize tasks into four columns:
  - To Do
  - In Progress
  - Closed
  - Frozen
- **Priority Indicators:** Identify task priority visually.
- **Responsive Layout:** Adapt the interface to different screen sizes.
- **API Integration:** Retrieve and manage task data through MockAPI.

## Tech Stack

- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- MockAPI (REST API)

## Getting Started

### Prerequisites

A modern web browser and an internet connection.

### Installation

Clone the repository:

```bash
git clone https://github.com/Mahdi-hz83/Task_Manager.git
cd Task_Manager
```

Open `index.html` in your browser.

No build step is required for the current setup.

## Project Structure

```text
Task_Manager/
├── index.html
├── script.js
└── output.css
```

- `index.html` — Application layout and task form.
- `script.js` — Task management logic and API requests.
- `output.css` — CSS styles.

Tailwind CSS is also loaded through its CDN in the HTML file.

## API

The application uses MockAPI to store and retrieve tasks. The API endpoint is configured in `script.js`.

If you fork this project, configure your own MockAPI endpoint if you want to use a separate data source.

## Author

**Mahdi Hosseinzadeh**

- GitHub: [@Mahdi-hz83](https://github.com/Mahdi-hz83)
- Repository: [Task_Manager](https://github.com/Mahdi-hz83/Task_Manager)

## License

No license has been specified for this repository.
