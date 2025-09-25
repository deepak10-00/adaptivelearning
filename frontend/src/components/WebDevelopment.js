import React, { useState } from "react";

const webDevConcepts = [
    {
        title: "HTML",
        explanation:
            "HTML (HyperText Markup Language) is the foundation of web pages. It provides the structure of the content using tags like headings, paragraphs, links, images, forms, and tables. Mastery of HTML ensures properly organized and semantic web content.",
        code: `<h1>Hello, World!</h1>`,
        example: `<html>
  <head><title>My Page</title></head>
  <body>
    <h1>Hello, World!</h1>
    <p>Welcome to web development.</p>
  </body>
</html>`,
        tasks: [
            "Create a basic HTML structure with header, footer and main section.",
            "Add a form with text input and submit button.",
            "Use semantic tags like <article>, <section>, and <nav>.",
        ],
    },
    {
        title: "CSS",
        explanation:
            "CSS (Cascading Style Sheets) is used to style HTML elements — controlling colors, fonts, layout, spacing, and responsiveness. CSS empowers user experience through visual design and adaptable layouts using flexbox, grid, and media queries.",
        code: `h1 { color: cyan; font-size: 2em; }`,
        example: `body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}
h1 {
  color: cyan;
  text-align: center;
}`,
        tasks: [
            "Style an HTML page with different fonts and colors.",
            "Use flexbox to create a responsive navigation bar.",
            "Apply media queries for mobile-friendly layout.",
        ],
    },
    {
        title: "JavaScript",
        explanation:
            "JavaScript makes web pages interactive by manipulating DOM elements, handling events, and validating forms. It enables client-side logic, animations, and asynchronous data fetching.",
        code: `document.getElementById('btn').onclick = () => alert('Hello!');`,
        example: `const btn = document.getElementById('myBtn');
btn.addEventListener('click', () => {
  alert('Button clicked!');
});`,
        tasks: [
            "Create a button that changes text on click.",
            "Validate a form input before submission.",
            "Fetch and display data from an API.",
        ],
    },
    {
        title: "Frontend Frameworks",
        explanation:
            "Frameworks like React, Angular, and Vue provide structured ways to build complex, reusable, and performant frontend applications. They introduce components, state management, routing, and lifecycle methods.",
        code: `// React example: Functional component
function Hello() {
  return <h1>Hello, World!</h1>;
}`,
        example: `import React from 'react';
function App() {
  return <div>Welcome to React!</div>;
}
export default App;`,
        tasks: [
            "Build a reusable button component.",
            "Implement client-side routing with React Router.",
            "Manage component state and props correctly.",
        ],
    },
    {
        title: "Backend Development",
        explanation:
            "Backend technologies like Node.js, Express, and databases manage server logic, client requests, authentication, and data storage. Understanding REST principles and server deployment is essential for full-stack development.",
        code: `// Express example: Basic server
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World'));
app.listen(3000);`,
        example: `const app = require('express')();
app.get('/api', (req, res) => {
  res.json({ message: "API is working" });
});
app.listen(3000);`,
        tasks: [
            "Create a REST API endpoint returning JSON data.",
            "Implement user authentication with JWT.",
            "Connect to a database and perform CRUD operations.",
        ],
    },
    {
        title: "APIs",
        explanation:
            "APIs (Application Programming Interfaces) enable communication between different software components. RESTful APIs leverage HTTP methods to read/write data, while GraphQL provides flexible data querying.",
        code: `fetch('/api/posts')
  .then(response => response.json())
  .then(data => console.log(data));`,
        example: `// Fetch from API and display data
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(posts => posts.forEach(post => console.log(post.title)));`,
        tasks: [
            "Create a REST API to manage a resource.",
            "Build a frontend fetch request to consume an API.",
            "Experiment with query parameters to filter data.",
        ],
    },
    {
        title: "Databases",
        explanation:
            "Databases store, retrieve, and manage data persistently. SQL databases like MySQL and PostgreSQL use tables and relations. NoSQL databases such as MongoDB store JSON-like documents for flexibility.",
        code: `// MySQL query example
SELECT * FROM users WHERE age > 18;`,
        example: `// MongoDB find operation
db.collection('users').find({ age: { $gt: 18 } });`,
        tasks: [
            "Design a SQL table and insert sample records.",
            "Write queries to select, update, and delete data.",
            "Use MongoDB to insert and query JSON documents.",
        ],
    },
    {
        title: "Deployment & Hosting",
        explanation:
            "Deployment involves pushing your web applications to hosting services (like Netlify, Vercel, Heroku, AWS). It includes building production-ready bundles, environment management, and continuous deployment pipelines.",
        code: `// Example: Deploy React app to Netlify (CLI)
netlify deploy --prod`,
        example: `// Build React app for production
npm run build`,
        tasks: [
            "Deploy a simple website on Netlify or Vercel.",
            "Set environment variables securely for your app.",
            "Configure backend server deployment on Heroku.",
        ],
    },
    {
        title: "Version Control & Collaboration",
        explanation:
            "Version control systems like Git help keep track of code changes, enable collaboration, branching, and managing releases. Platforms like GitHub provide code hosting and project management tools.",
        code: `git init
git add .
git commit -m "Initial commit"`,
        example: `git clone https://github.com/username/repo.git
git checkout -b feature-branch`,
        tasks: [
            "Create a git repository and commit your code.",
            "Practice branching and merging workflows.",
            "Collaborate on a project using GitHub pull requests.",
        ],
    },
];

export default function WebDevelopment() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="p-6 bg-[#171A23] min-h-screen w-full text-white">
            {/* Heading and Professor Code box */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-400 mb-4 md:mb-0">Web Development</h1>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={professorCode}
                        onChange={(e) => setProfessorCode(e.target.value)}
                        placeholder="Enter Professor Code"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-violet-400 focus:ring"
                    />
                    <button
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                        onClick={() => {
                            alert(`Connecting with professor code: ${professorCode}`);
                            setProfessorCode("");
                        }}
                    >
                        Connect
                    </button>
                </div>
            </div>

            <p className="mb-6 text-lg">
                Learn the essentials of building modern websites and applications using HTML, CSS, JavaScript, frameworks, backend services, APIs, databases, version control, and deployment.
            </p>

            <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {webDevConcepts.map((concept, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-shadow"
                    >
                        <h3 className="text-yellow-300 text-lg font-bold mb-3">{idx + 1}. {concept.title}</h3>
                        <p className="text-gray-200 mb-3">{concept.explanation}</p>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Code:</strong>
                            <pre className="bg-gray-900 p-2 rounded text-xs font-mono whitespace-pre-wrap">{concept.code}</pre>
                        </div>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Example:</strong>
                            <pre className="bg-gray-900 p-2 rounded text-xs font-mono whitespace-pre-wrap">{concept.example}</pre>
                        </div>
                        <div>
                            <strong className="text-yellow-400">Tasks:</strong>
                            <ul className="list-disc list-inside space-y-1 text-gray-200 mt-1">
                                {concept.tasks.map((task, i) => <li key={i}>{task}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
