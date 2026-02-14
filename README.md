# IDE Portfolio Template

A high-fidelity, developer-focused portfolio template designed to look and feel exactly like Visual Studio Code. Built with React, Tailwind CSS, and optimized for modern browsers using ES Modules.

## 🚀 Quick Start (Local Development)

Since this project uses ES Modules directly via `esm.sh` in the `index.html`, you don't need a heavy build step. You just need a local static server.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ide-portfolio.git
    cd ide-portfolio
    ```

2.  **Run a local server:**
    Using Node.js (recommended):
    ```bash
    npx serve .
    ```
    Using Python:
    ```bash
    python -m http.server 8000
    ```

3.  **View in browser:**
    Open `http://localhost:3000` (or `8000`) to see your portfolio in action.

## 🛠 Configuration

To personalize this portfolio, simply edit the `portfolio.config.ts` file. All your personal details, project descriptions, and experience data are centralized there.

## 🤝 Contributing

We love contributions! Whether it's a new theme, a bug fix, or a new feature (like a "Git Graph" view), follow these steps:

1.  **Fork** the repository.
2.  **Create a branch** for your feature (`git checkout -b feature/cool-new-thing`).
3.  **Commit** your changes (`git commit -m 'Add some cool thing'`).
4.  **Push** to the branch (`git push origin feature/cool-new-thing`).
5.  **Open a Pull Request**.

## 🎨 Themes

The app supports multiple themes out of the box (Dracula, GitHub Light, Solarized). You can add your own themes in `constants.tsx`.

---
Built with ❤️ by [Your Name]