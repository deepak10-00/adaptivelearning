import React, { useState } from "react";

const discreteMathConcepts = [
    {
        title: "Propositional Logic",
        explanation:
            "Studies formal logical statements and connectives such as AND (∧), OR (∨), and NOT (¬). It forms the basis for reasoning and proving statements.",
        code: `// Example: (P ∧ Q) → R`,
        example: `if (P && Q) {
  R = true;
}`,
        tasks: [
            "Evaluate truth tables for logical expressions.",
            "Simplify logical formulas using laws of logic.",
            "Implement logical operators in code.",
        ],
    },
    {
        title: "Set Theory",
        explanation:
            "Explores collections of distinct objects and their relationships via operations like union, intersection, and set difference.",
        code: `// Example: A = {1, 2, 3}, B = {2, 3, 4}`,
        example: `A ∪ B = {1, 2, 3, 4}`,
        tasks: [
            "Implement union and intersection of sets in code.",
            "Prove properties like De Morgan's laws.",
            "Explore Venn diagrams for set relations.",
        ],
    },
    {
        title: "Combinatorics",
        explanation:
            "Deals with counting, permutations, combinations, and arrangement of objects, essential for probability and discrete structures.",
        code: `// Number of permutations: n!`,
        example: `Permutations of {a,b,c}: 3! = 6`,
        tasks: [
            "Calculate permutations and combinations.",
            "Solve problems involving the pigeonhole principle.",
            "Implement factorial and combinations functions.",
        ],
    },
    {
        title: "Graph Theory",
        explanation:
            "Studies graphs composed of vertices and edges, fundamental for modeling networks, paths, and connectivity.",
        code: `// Graph represented as adjacency list`,
        example: `Graph G = {V, E}, V={1,2,3}, E={(1,2), (2,3)}`,
        tasks: [
            "Implement BFS and DFS graph traversals.",
            "Find connected components.",
            "Detect cycles in a graph.",
        ],
    },
    {
        title: "Discrete Probability",
        explanation:
            "Analyzes probabilities of events in finite sample spaces, involving computation and applications in randomized algorithms.",
        code: `// Probability of event A: P(A) = |A| / |S|`,
        example: `P(rolling a 3 on a die) = 1/6`,
        tasks: [
            "Compute probability for die rolls and card draws.",
            "Explore conditional probability.",
            "Simulate probability experiments.",
        ],
    },
    {
        title: "Number Theory",
        explanation:
            "Investigates properties of integers, divisibility, primes, modular arithmetic, and applications in cryptography.",
        code: `// Example: gcd(a, b) using Euclidean algorithm`,
        example: `gcd(54, 24) = 6`,
        tasks: [
            "Implement Euclidean GCD algorithm.",
            "Test for prime numbers.",
            "Explore modular inverses.",
        ],
    },
    {
        title: "Boolean Algebra",
        explanation:
            "Manipulates binary variables with operations AND, OR, NOT; used in circuit design and logic simplification.",
        code: `// Boolean expression: A AND (B OR NOT C)`,
        example: `F = A ∧ (B ∨ ¬C)`,
        tasks: [
            "Simplify Boolean expressions using laws.",
            "Design truth tables.",
            "Implement logic gates in code.",
        ],
    },
    {
        title: "Recurrence Relations",
        explanation:
            "Defines sequences recursively, analyzed to solve time complexity in algorithms and growth patterns.",
        code: `// Example: T(n) = 2T(n/2) + n`,
        example: `Merge sort recurrence`,
        tasks: [
            "Solve simple recurrence relations.",
            "Use substitution method for recurrence solutions.",
            "Apply Master theorem.",
        ],
    },
    {
        title: "Logic Circuits",
        explanation:
            "Design and analysis of digital logic circuits based on Boolean functions, utilizing gates like AND, OR, XOR, NOT.",
        code: `// XOR gate truth table`,
        example: `A B | A XOR B\n0 0 | 0\n0 1 | 1\n1 0 | 1\n1 1 | 0`,
        tasks: [
            "Draw circuit diagrams for logic expressions.",
            "Simplify circuits using Karnaugh maps.",
            "Build basic combinational circuits.",
        ],
    },
    {
        title: "Formal Languages & Automata",
        explanation:
            "Study of abstract machines and formal grammars that describe language syntax and computational power.",
        code: `// Finite automaton example`,
        example: `State diagram accepting binary strings ending with 0`,
        tasks: [
            "Design finite automata for simple languages.",
            "Understand regular expressions.",
            "Analyze Turing machines basics.",
        ],
    },
];

function ConceptCard({ title, explanation, code, example, tasks }) {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform">
            <h3 className="text-yellow-300 text-lg font-bold mb-3">{title}</h3>
            <p className="text-gray-300 mb-3">{explanation}</p>
            <div className="mb-3">
                <strong className="text-yellow-400">Formula/Code:</strong>
                <pre className="bg-gray-900 p-2 rounded font-mono text-sm whitespace-pre-wrap">{code}</pre>
            </div>
            <div className="mb-3">
                <strong className="text-yellow-400">Example:</strong>
                <pre className="bg-gray-900 p-2 rounded font-mono text-sm whitespace-pre-wrap">{example}</pre>
            </div>
            <div>
                <strong className="text-yellow-400">Tasks:</strong>
                <ul className="list-disc list-inside space-y-1 text-gray-400 mt-1">
                    {tasks.map((task, idx) => (
                        <li key={idx}>{task}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function DiscreteMath() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="p-6 bg-[#171A23] min-h-screen w-full text-white">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-400 mb-4 md:mb-0">Discrete Math</h1>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={professorCode}
                        onChange={(e) => setProfessorCode(e.target.value)}
                        placeholder="Enter Professor Code"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 outline-none focus:ring focus:ring-violet-500"
                    />
                    <button
                        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300"
                        onClick={() => {
                            alert(`Connecting with professor code: ${professorCode}`);
                            setProfessorCode("");
                        }}
                    >
                        Connect
                    </button>
                </div>
            </div>

            <p className="mb-8 text-lg max-w-3xl">
                Explore foundational concepts in logic, sets, combinatorics, probability, graphs, and automata — essential for computer science and discrete mathematics.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl">
                {discreteMathConcepts.map((concept, idx) => (
                    <ConceptCard key={idx} {...concept} />
                ))}
            </section>
        </div>
    );
}
