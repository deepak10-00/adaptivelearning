import React, { useState } from "react";
//import { CheckCircleIcon } from "@heroicons/react/solid";

const courseConcepts = [
    {
        title: "Introduction to Java and Setup of Development Environment",
        explanation:
            "Java is a widely-used, object-oriented programming language. Setting up Java involves installing the Java Development Kit (JDK), configuring your IDE, and running your first program to validate your environment. Understanding compilation and JVM is essential for all future Java work.",
        syntax: `public class ClassName {
  public static void main(String[] args) {
    // code
  }
}`,
        example: `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}`,
        tasks: [
            "Install JDK and set up your favorite Java IDE.",
            "Write and run a Hello World Java program.",
            "Change the output message in Hello World and rerun your code.",
        ],
    },
    {
        title: "Basic Syntax and Data Types",
        explanation:
            "Java syntax closely resembles C/C++, with additional support for OOP. Master primitives (int, double, boolean, char), Strings, arrays, initialization, and understand how data types affect memory and operations.",
        syntax: `int age = 30;
float price = 10.99f;
char initial = 'A';
boolean found = true;
String name = "Java";`,
        example: `int myNum = 5;
float myFloat = 5.99f;
char myChar = 'A';
boolean myBool = true;
String myText = "Java";`,
        tasks: [
            "Declare each primitive type and print values.",
            "Write a program converting an int to a float.",
            "Check if a boolean is true and display a custom message.",
        ],
    },
    {
        title: "Control Structures and Loops",
        explanation:
            "Java uses if-else and switch for decision-making, and loops (for, while, do-while) for repetition. These structures are key for automation, searching, and iterating through data efficiently.",
        syntax: `if (condition) {
  // do something
} else {
  // do something else
}

for (int i = 0; i < n; i++) {
  // repeat n times
}`,
        example: `if (x > 5) {
  System.out.println("x is greater than 5");
} else {
  System.out.println("x is 5 or less");
}

for (int i = 0; i < 5; i++) {
  System.out.println(i);
}`,
        tasks: [
            "Write a program to check if a number is even or odd.",
            "Use a loop to print all multiples of 3 up to 30.",
            "Build a loop that calculates and prints the factorial of a given number.",
        ],
    },
    {
        title: "Methods and Recursion",
        explanation:
            "Methods are reusable blocks of code for logical organization. Recursion allows methods to call themselves, solving problems with repeated substructure like factorial or Fibonacci. Learn to define, call, and reuse methods.",
        syntax: `public static int factorial(int n) {
  if (n == 0) return 1;
  else return n * factorial(n - 1);
}`,
        example: `System.out.println(factorial(5)); // Output: 120`,
        tasks: [
            "Create a method to add two numbers.",
            "Write a method to print a given word ten times.",
            "Implement a recursive method to generate Fibonacci sequence up to n.",
        ],
    },
    {
        title: "Object-Oriented Concepts: Classes and Objects",
        explanation:
            "Java defines data and behavior using classes and creates objects as instances. Master classes, object creation, fields, and methods for encapsulation, modularity, and abstraction.",
        syntax: `class Dog {
  String name;
  void bark() {
    System.out.println("Woof!");
  }
}`,
        example: `class Car {
  String model;
  void honk() {
    System.out.println("Beep!");
  }
}
Car myCar = new Car();
myCar.model = "Tesla";
myCar.honk();`,
        tasks: [
            "Define a Person class with fields and a introduce method.",
            "Create two objects of the class and call their methods.",
            "Modify a field value on an object and print the result.",
        ],
    },
    {
        title: "Inheritance and Polymorphism",
        explanation:
            "Inheritance enables one class to reuse behavior of another; polymorphism lets you override methods and use parent references for dynamic dispatch. Learn to build hierarchies and override functions.",
        syntax: `class Animal {
  void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
  @Override
  void sound() { System.out.println("Woof"); }
}`,
        example: `Dog d = new Dog();
d.sound(); // Output: Woof`,
        tasks: [
            "Create a base Animal class and two subclasses with overridden methods.",
            "Demonstrate polymorphism by storing a subclass object in a base type variable and calling its method.",
            "Add a new method in a subclass and test its accessibility.",
        ],
    },
    {
        title: "Exception Handling",
        explanation:
            "Java uses try-catch-finally blocks to handle runtime errors and prevent crashes. Learn to anticipate exceptions, control execution flow, and write robust error-sensitive programs.",
        syntax: `try {
  // risky code
} catch (ExceptionType e) {
  // handle error
}`,
        example: `try {
  int div = 10 / 0;
} catch (ArithmeticException e) {
  System.out.println("Cannot divide by zero");
}`,
        tasks: [
            "Write a program that handles division by zero.",
            "Catch and print a NullPointerException with a custom message.",
            "Use finally to print a completion message after every try-catch.",
        ],
    },
    {
        title: "Collections Framework Overview",
        explanation:
            "Java's Collections Framework includes ArrayList, HashSet, HashMap and more, for flexible data storage and manipulation. Learn about generics, iteration, and standard operations (add, remove, get).",
        syntax: `import java.util.ArrayList;
ArrayList<Type> list = new ArrayList<>();`,
        example: `ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
System.out.println(fruits);`,
        tasks: [
            "Create an ArrayList of integers and add five numbers to it.",
            "Remove an item from the list and print the updated contents.",
            "Iterate over a HashMap and print all key-value pairs.",
        ],
    },
    {
        title: "File Handling and Input/Output Streams",
        explanation:
            "Java APIs like FileWriter and FileReader allow reading from and writing to files. Understand streams for handling data reliably, and learn cleanup (close) operations to prevent resource leaks.",
        syntax: `import java.io.FileWriter;
FileWriter writer = new FileWriter("file.txt");
writer.write("Hello");
writer.close();`,
        example: `try {
  FileWriter writer = new FileWriter("output.txt");
  writer.write("Hello, Java!");
  writer.close();
} catch (IOException e) {
  e.printStackTrace();
}`,
        tasks: [
            "Write a program that saves user input to a file.",
            "Read content from a file and print it to the console.",
            "Handle potential IOExceptions with appropriate error messages.",
        ],
    },
    {
        title: "Practical Mini-Project: Console-Based Java Application",
        explanation:
            "Bring all your knowledge together by building a small app, such as a calculator, student record system, or quiz. Use input, methods, control structures, collections, and error handling for real-world practice.",
        syntax: `Scanner sc = new Scanner(System.in);
int a = sc.nextInt();
int b = sc.nextInt();
System.out.println(a + b);`,
        example: `import java.util.Scanner;

public class Calculator {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter two numbers: ");
    int a = sc.nextInt();
    int b = sc.nextInt();
    System.out.println("Sum: " + (a + b));
    sc.close();
  }
}`,
        tasks: [
            "Design a console-based calculator to perform basic arithmetic.",
            "Expand the app to handle invalid inputs using exceptions.",
            "Add history tracking for previous calculations using ArrayList.",
        ],
    },
];

const learningOutcomes = [
    "Java Syntax and Structure: Learn the building blocks of Java programs including classes, methods, variables, and data types.",
    "Control Flow: Understand decision-making using if-else, switch statements, and loops like for, while, and do-while.",
    "Object-Oriented Programming (OOP): Dive into classes, objects, inheritance, polymorphism, encapsulation, and abstraction.",
    "Exception Handling: Manage runtime errors gracefully using try-catch blocks and custom exceptions.",
    "Java Standard Library: Utilize core libraries for input/output, data structures, utilities, and more.",
    "Basic Input/Output: Read input from users, display output, and work with files and streams.",
];

export default function JavaFundamentalsPage() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="min-h-screen bg-[#101725] flex justify-center py-16 px-4">
            <div className="bg-[#1b2232] rounded-2xl shadow-2xl max-w-6xl w-full p-10 text-white font-sans">
                {/* Header and Connect */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                    <h1 className="text-5xl font-extrabold text-cyan-400 mb-6 md:mb-0">
                        Java Fundamentals
                    </h1>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Enter Professor Code"
                            value={professorCode}
                            onChange={(e) => setProfessorCode(e.target.value)}
                            className="w-full md:w-auto bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <button
                            className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-lg font-semibold transition"
                            onClick={() => {
                                alert(`Connecting with professor code: ${professorCode}`);
                                setProfessorCode("");
                            }}
                        >
                            Connect
                        </button>
                    </div>
                </div>

                {/* Introduction */}
                <p className="max-w-3xl mb-12 text-lg leading-relaxed text-gray-300">
                    Java is a versatile and powerful programming language widely used in enterprise applications,
                    mobile development, and web services. This course introduces the core concepts and syntax of
                    Java programming, enabling you to build robust and scalable software.
                </p>

                {/* What You Will Learn */}
                <section className="max-w-3xl mb-16">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-6">What You Will Learn</h2>
                    <ul className="list-disc list-inside space-y-3 text-gray-300 text-lg">
                        {learningOutcomes.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 flex-shrink-0 text-yellow-400 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12l2 2 4-4"
                                    />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Course Structure */}
                <section>
                    <h2 className="text-3xl font-bold text-yellow-400 mb-8">Course Structure</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {courseConcepts.map(({ title, explanation, syntax, example, tasks }, idx) => (
                            <div
                                key={idx}
                                className="bg-[#222940] rounded-xl shadow-lg p-7 hover:shadow-2xl transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold text-yellow-300 mb-4">
                                    {idx + 1}. {title}
                                </h3>
                                <p className="text-gray-300 mb-5">{explanation}</p>

                                <div className="mb-5">
                                    <strong className="text-yellow-400 block mb-1">Syntax:</strong>
                                    <pre className="bg-gray-900 p-4 rounded text-white text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                    {syntax}
                  </pre>
                                </div>

                                <div className="mb-5">
                                    <strong className="text-yellow-400 block mb-1">Example:</strong>
                                    <pre className="bg-gray-900 p-4 rounded text-white text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                    {example}
                  </pre>
                                </div>

                                <div>
                                    <strong className="text-yellow-400 block mb-2">Tasks:</strong>
                                    <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                        {tasks.map((task, t_idx) => (
                                            <li key={t_idx}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Get Started */}
                <section className="max-w-3xl mt-16">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-4">Get Started</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Begin with these foundational Java concepts, try all practice tasks for hands-on learning,
                        and keep exploring to master both the basics and advanced features.
                    </p>
                </section>
            </div>
        </div>
    );
}
