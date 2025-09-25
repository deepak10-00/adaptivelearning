import React, { useState } from "react";
import './CoursePage.css';

const algorithmConcepts = [
    {
        title: "Sorting Algorithms",
        explanation:
            "Sorting algorithms arrange data in a particular order, essential for efficient searching and data processing. Classic algorithms include bubble sort, selection sort, insertion sort, merge sort, and quicksort.",
        code: `int[] arr = {5, 2, 8, 1};
Arrays.sort(arr);`,
        example: `int[] arr = {5, 2, 8, 1};
Arrays.sort(arr);
System.out.println(Arrays.toString(arr)); // Output: [1, 2, 5, 8]`,
        tasks: [
            "Implement bubble sort and test with sample data.",
            "Write quicksort to sort an integer array.",
            "Compare performance of different sorting algorithms."
        ],
    },
    {
        title: "Searching Algorithms",
        explanation:
            "Searching algorithms find specific values within data. Linear search checks every element; binary search efficiently finds values in sorted arrays.",
        code: `int idx = Arrays.binarySearch(arr, 5);`,
        example: `int[] arr = {1, 2, 3, 4, 5};
int idx = Arrays.binarySearch(arr, 3);
System.out.println(idx); // Output: 2`,
        tasks: [
            "Implement linear search on an array.",
            "Write binary search for sorted arrays.",
            "Test searching for non-existing elements."
        ],
    },
    {
        title: "Recursion",
        explanation:
            "Recursion solves problems by breaking them into smaller instances of the same problem, often leading to elegant and simple code. Common examples include factorial, Fibonacci sequence, and tree traversals.",
        code: `int factorial(int n) {
  if (n == 0) return 1;
  else return n * factorial(n - 1);
}`,
        example: `System.out.println(factorial(5)); // Output: 120`,
        tasks: [
            "Write a recursive function for factorial.",
            "Implement recursive Fibonacci sequence.",
            "Use recursion for tree traversals."
        ],
    },
    {
        title: "Graph Algorithms",
        explanation:
            "Graph algorithms explore structures of nodes connected by edges. BFS and DFS traverse graphs for connectivity and shortest path detection. Algorithms include Dijkstra’s and Prim’s for weighted graphs.",
        code: `List<Integer>[] graph = new ArrayList[n];
void bfs(int start) { /* BFS traversal */ }`,
        example: `// Pseudocode for BFS traversal
Queue<Integer> queue = new LinkedList<>();
queue.add(start);
// Perform BFS visiting neighbors`,
        tasks: [
            "Implement BFS and DFS graph traversal.",
            "Detect cycles in directed and undirected graphs.",
            "Find shortest path using Dijkstra’s algorithm."
        ],
    },
    {
        title: "Dynamic Programming",
        explanation:
            "Dynamic Programming optimizes recursive solutions by caching results of overlapping subproblems, reducing time complexity dramatically. Common problems include the knapsack, coin change, and longest common subsequence.",
        code: `int[] dp = new int[n+1]; // Cache for subproblems`,
        example: `// Bottom-up DP example for Fibonacci
dp[0] = 0; dp[1] = 1;
for(int i=2; i<=n; i++){
  dp[i] = dp[i-1] + dp[i-2];
}`,
        tasks: [
            "Implement memoized Fibonacci algorithm.",
            "Solve the coin change problem using DP.",
            "Find longest common subsequence of two strings."
        ],
    },
    {
        title: "Greedy Algorithms",
        explanation:
            "Greedy algorithms build solutions piece by piece, choosing the most promising option at each step without revisiting decisions. Useful for problems like activity selection and Huffman coding.",
        code: `// Pseudocode: choose local optimum at each step`,
        example: `// Example: Activity selection picks earliest finishing activities`,
        tasks: [
            "Solve interval scheduling using greedy method.",
            "Implement Huffman coding for data compression.",
            "Explore limitations where greedy fails."
        ],
    },
    {
        title: "Backtracking",
        explanation:
            "Backtracking systematically explores all potential candidates to build solutions, abandoning incomplete or invalid paths early. Used in puzzles, permutations, and constraint satisfaction problems.",
        code: `// Pseudocode for backtracking template`,
        example: `// Solve N-queens problem using backtracking`,
        tasks: [
            "Implement N-Queens problem solver.",
            "Generate all permutations of a list.",
            "Solve Sudoku using backtracking algorithm."
        ],
    },
    {
        title: "Divide and Conquer",
        explanation:
            "Divide and conquer splits problems into subproblems, solves them recursively, and combines results. Quicksort and mergesort exemplify this strategy.",
        code: `// Example: merge sort divides array recursively`,
        example: `// Recursive merge of sorted subarrays`,
        tasks: [
            "Implement merge sort algorithm.",
            "Use divide and conquer for binary search.",
            "Apply divide and conquer to matrix multiplication."
        ],
    },
    {
        title: "Greedy vs Dynamic Programming",
        explanation:
            "Compare greedy approaches that make local choices with dynamic programming that explores multiple options with memoization. Understanding the problem structure helps pick the right strategy.",
        code: `// Different problem sets suited to each approach`,
        example: `// Greedy often easier but not always correct`,
        tasks: [
            "Identify suitable problems for greedy and DP.",
            "Implement examples of both for similar problems.",
            "Analyze time and space complexity differences."
        ],
    },
    {
        title: "Algorithm Complexity",
        explanation:
            "Analyzing algorithms in terms of time and space complexity helps evaluate efficiency and scalability. Big O notation describes upper performance bounds.",
        code: `// Example of Big O: O(n), O(log n), O(n^2)`,
        example: `// Linear search is O(n), binary search is O(log n)`,
        tasks: [
            "Calculate time complexity of bubble sort.",
            "Compare linear vs binary search complexities.",
            "Understand trade-offs between time and space."
        ],
    },
];

export default function Algorithms() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="p-6 bg-[#171A23] min-h-screen w-full text-white">
            {/* Heading and professor connect */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-400">Algorithms</h1>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={professorCode}
                        onChange={e => setProfessorCode(e.target.value)}
                        placeholder="Enter Professor Code"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring focus:ring-violet-500"
                    />
                    <button
                        className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold text-black hover:bg-yellow-300"
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
                Dive into essential algorithms including sorting, searching, recursion, graph traversal, dynamic programming, greedy methods, and complexity analysis.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {algorithmConcepts.map(({ title, explanation, code, example, tasks }, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl p-6 shadow-lg transition-transform hover:scale-105">
                        <h2 className="text-yellow-300 text-lg font-bold mb-3">{idx + 1}. {title}</h2>
                        <p className="text-gray-300 mb-3">{explanation}</p>
                        {code && (
                            <div className="mb-3">
                                <strong className="text-yellow-400">Code:</strong>
                                <pre className="bg-gray-900 p-2 rounded whitespace-pre-wrap text-sm font-mono">{code}</pre>
                            </div>
                        )}
                        {example && (
                            <div className="mb-3">
                                <strong className="text-yellow-400">Example:</strong>
                                <pre className="bg-gray-900 p-2 rounded whitespace-pre-wrap text-sm font-mono">{example}</pre>
                            </div>
                        )}
                        {tasks && (
                            <div>
                                <strong className="text-yellow-400">Tasks:</strong>
                                <ul className="list-disc list-inside space-y-1 mt-1 text-gray-300">
                                    {tasks.map((task, i) => <li key={i}>{task}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
}
