import React, { useState } from "react";

const pythonConcepts = [
    {
        title: "Introduction to Python and Setup of Development Environment",
        explanation:
            "Python is a popular, high-level language acclaimed for its readability and simplicity. Begin by installing the Python interpreter and setting up an IDE such as VS Code or PyCharm. Running a 'Hello, World!' script confirms a successful setup and introduces Python's syntax.",
        syntax: `print("Hello, World!")`,
        example: `# Prints Hello, World!
print("Hello, World!")`,
        tasks: [
            "Install Python and an IDE of your choice.",
            "Write and run a Hello World program.",
            "Change the output text and re-run the script.",
        ],
    },
    {
        title: "Basic Syntax and Data Types",
        explanation:
            "Python uses indentation to define blocks and supports dynamic typing. Key data types include int, float, str, bool, list, dict, tuple, and set. Mastering variable assignment, conversions, and type checking ensures better code quality.",
        syntax: `x = 5
name = "Python"
is_active = True`,
        example: `x = 10
name = "Python"
is_active = True
print(x, name, is_active)`,
        tasks: [
            "Declare variables of different data types and print them.",
            "Convert an integer to a string and display its type.",
            "Check if a variable is of type int and print the result.",
        ],
    },
    {
        title: "Control Structures and Loops",
        explanation:
            "Python handles decision-making using if, elif, else statements and executes repetitive tasks using for and while loops. Learn how to use conditions and iterate collection elements efficiently.",
        syntax: `if condition:
    # do something
else:
    # do something else
for i in range(5):
    print(i)`,
        example: `x = 7
if x > 5:
    print("x is greater than 5")
else:
    print("x is 5 or less")
for i in range(5):
    print(i)`,
        tasks: [
            "Write a program to check if a number is even or odd.",
            "Use a loop to print all multiples of 4 between 0 and 20.",
            "Build a loop to sum all numbers from 1 to 50.",
        ],
    },
    {
        title: "Functions and Recursion",
        explanation:
            "Functions organize code into reusable blocks. Recursion lets a function call itself, solving problems like factorial, Fibonacci, and tree traversals. Understand how to define, call, and return values from functions.",
        syntax: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)`,
        example: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n -1)
print(factorial(5))  # Output: 120`,
        tasks: [
            "Write a function to add two numbers.",
            "Create a function that prints a string five times.",
            "Implement a recursive function to compute the nth Fibonacci number.",
        ],
    },
    {
        title: "Object-Oriented Programming (OOP)",
        explanation:
            "Python enables modular design with classes and objects, supporting encapsulation, inheritance, and polymorphism. Learn to define classes, instantiate objects, and override methods.",
        syntax: `class Animal:
    def sound(self):
        print("Animal sound")
class Dog(Animal):
    def sound(self):
        print("Woof")`,
        example: `dog = Dog()
dog.sound()  # Output: Woof`,
        tasks: [
            "Define a class Person with a greet method.",
            "Create two objects of the class and call their methods.",
            "Add an age attribute and demonstrate changing its value.",
        ],
    },
    {
        title: "Exception Handling",
        explanation:
            "Python uses try-except blocks to handle errors gracefully, allowing your program to recover from unexpected issues. Learn to catch specific exceptions and use finally for cleanup actions.",
        syntax: `try:
    # risk code
except ExceptionType:
    # handle error`,
        example: `try:
    x = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")`,
        tasks: [
            "Write code to handle division by zero.",
            "Catch and print a ValueError with a custom message.",
            "Use finally to confirm completion of a risky operation.",
        ],
    },
    {
        title: "Data Structures",
        explanation:
            "Python features lists, tuples, sets, and dictionaries for flexible data management. Each structure supports different use cases, from ordered collections to key-value mapping and unique sets.",
        syntax: `my_list = [1, 2, 3]
my_dict = {'a': 1, 'b': 2}`,
        example: `my_list = [1, 2, 3]
my_dict = {'a': 1, 'b': 2}
print(my_list[0], my_dict['a'])`,
        tasks: [
            "Create a list and add elements, then remove one.",
            "Construct a dictionary and iterate over its key-value pairs.",
            "Use a set to filter out duplicates from a list.",
        ],
    },
    {
        title: "File Handling and I/O",
        explanation:
            "Python uses open(), read(), and write() for file operations. Master file reading, writing, and context management ('with' statement) to prevent resource leaks.",
        syntax: `with open('file.txt', 'w') as f:
    f.write('Hello')`,
        example: `with open('output.txt', 'w') as f:
    f.write('Hello, Python!')`,
        tasks: [
            "Write user input to a file and close it.",
            "Read content from a file and print each line.",
            "Handle FileNotFoundError with a user-friendly message.",
        ],
    },
    {
        title: "Libraries and Modules",
        explanation:
            "Python provides standard and third-party libraries to expand functionality. Learn to import modules, use built-ins (random, math, datetime), and install external packages for advanced features.",
        syntax: `import math
print(math.sqrt(16))`,
        example: `import random
number = random.randint(1, 100)
print("Random number:", number)`,
        tasks: [
            "Import the datetime module and print the current date.",
            "Use the math library to calculate the square root and power of a number.",
            "Install a package using pip and show usage in a sample script.",
        ],
    },
    {
        title: "Practical Mini-Project: Calculator",
        explanation:
            "Bring together input, functions, loops, error handling, and print statements to build a functional calculator. Expand it to handle errors and multiple arithmetic operations.",
        syntax: `def add(a, b):
    return a + b`,
        example: `def add(a, b):
    return a + b
num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))
print("Sum:", add(num1, num2))`,
        tasks: [
            "Extend the calculator to include subtraction, multiplication, and division.",
            "Handle invalid input with exception handling.",
            "Print a menu and allow the user to choose the operation.",
        ],
    },
];

export default function PythonBasics() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg min-h-screen w-full">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-400 mb-4 md:mb-0">Python Basics</h1>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={professorCode}
                        onChange={(e) => setProfessorCode(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-violet-400 focus:ring focus:ring-violet-500 outline-none"
                        placeholder="Enter Professor Code"
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
                Python is a versatile, high-level programming language known for its readability and simplicity. It is widely used in web development, data science, AI, automation, and more.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Course Structure</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pythonConcepts.map((concept, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col transition hover:scale-105 hover:shadow-2xl"
                        >
                            <h3 className="text-lg font-bold mb-2 text-yellow-300">
                                {idx + 1}. {concept.title}
                            </h3>
                            <p className="text-sm mb-2 text-gray-200">{concept.explanation}</p>
                            <div className="mb-2">
                                <strong className="text-yellow-400">Syntax:</strong>
                                <pre className="bg-gray-900 p-2 mt-1 rounded text-white text-xs font-mono whitespace-pre-wrap">{concept.syntax}</pre>
                            </div>
                            <div className="mb-2">
                                <strong className="text-yellow-400">Example:</strong>
                                <pre className="bg-gray-900 p-2 mt-1 rounded text-white text-xs font-mono whitespace-pre-wrap">{concept.example}</pre>
                            </div>
                            <div>
                                <strong className="text-yellow-400">Tasks:</strong>
                                <ul className="list-disc list-inside space-y-1 text-gray-200 mt-1">
                                    {concept.tasks.map((task, t_idx) => (
                                        <li key={t_idx}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3 text-yellow-400">Get Started</h2>
                <p>
                    Explore each Python concept, attempt the tasks, and build projects for hands-on mastery!
                </p>
            </section>
        </div>
    );
}
