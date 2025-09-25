import React, { useState } from "react";
//import CompilerBox from "../../components/CompilerBox";

const courseConcepts = [
    {
        title: "Arrays",
        explanation:
            "Arrays hold elements in contiguous memory, allowing indexed access and efficient traversal. They have fixed size and support operations like insertion, deletion, and sorting, though resizing can be costly.",
        syntax: `int[] arr = {1,2,3,4,5};
System.out.println(arr[0]); // 1`,
        example: `int[] arr = {1,2,3,4,5};
System.out.println(arr[0]); // Output: 1`,
        tasks: [
            "Declare an array and print all its elements.",
            "Write a program to reverse an array.",
            "Implement linear search in an array.",
        ],
    },
    {
        title: "Linked Lists",
        explanation:
            "Linked Lists are composed of nodes where each node points to the next, offering dynamic memory and efficient insertion/deletion. Variants include singly, doubly, and circular linked lists.",
        syntax: `class Node {
  int data;
  Node next;
}`,
        example: `class Node {
  int data;
  Node next;
}`,
        tasks: [
            "Create a singly linked list and traverse it.",
            "Write code to insert a node at head.",
            "Delete a specific node from the list.",
        ],
    },
    {
        title: "Stacks",
        explanation:
            "Stacks operate on Last-In-First-Out (LIFO) principle, useful for expression evaluation and backtracking. Basic operations include push, pop, and peek.",
        syntax: `Stack<Integer> stack = new Stack<>();
stack.push(10);
int val = stack.pop();`,
        example: `Stack<Integer> stack = new Stack<>();
stack.push(10);
int val = stack.pop();`,
        tasks: [
            "Implement stack push and pop.",
            "Check for balanced parentheses using stack.",
            "Reverse a string using a stack.",
        ],
    },
    {
        title: "Queues",
        explanation:
            "Queues follow First-In-First-Out (FIFO) order, commonly used in scheduling, buffering, and BFS graph traversal.",
        syntax: `Queue<Integer> queue = new LinkedList<>();
queue.add(5);
int val = queue.poll();`,
        example: `Queue<Integer> queue = new LinkedList<>();
queue.add(5);
int val = queue.poll();`,
        tasks: [
            "Implement basic queue enqueue and dequeue.",
            "Simulate customer queue system.",
            "Design circular queue.",
        ],
    },
    {
        title: "Deque",
        explanation:
            "Deque (Double Ended Queue) allows inserting and removing elements from both ends, making it versatile for multiple algorithms including sliding window problems.",
        syntax: `Deque<Integer> deque = new ArrayDeque<>();
deque.addFirst(1);
deque.addLast(2);`,
        example: `Deque<Integer> deque = new ArrayDeque<>();
deque.addFirst(1);
deque.addLast(2);`,
        tasks: [
            "Perform add/remove from both ends.",
            "Use deque to check palindrome in string.",
            "Implement sliding window maximum.",
        ],
    },
    {
        title: "Trees",
        explanation:
            "Trees organize hierarchical data with nodes linked parent-child. Binary trees, BSTs, AVL trees, and segment trees differ in balancing and operations.",
        syntax: `class TreeNode {
  int val;
  TreeNode left, right;
}`,
        example: `class TreeNode {
  int val;
  TreeNode left, right;
}`,
        tasks: [
            "Implement inorder traversal.",
            "Insert elements into BST.",
            "Check if tree is balanced.",
        ],
    },
    {
        title: "Graphs",
        explanation:
            "Graphs represent relationships with nodes and edges. Key representations are adjacency lists or matrices. Algorithms like BFS, DFS, Dijkstra help explore graph properties.",
        syntax: `List<List<Integer>> adjList = new ArrayList<>();`,
        example: `List<List<Integer>> adjList = new ArrayList<>();`,
        tasks: [
            "Create adjacency list for graph.",
            "Implement BFS traversal.",
            "Detect cycle in directed graph.",
        ],
    },
    {
        title: "Heaps",
        explanation:
            "Heaps are complete binary trees maintaining max-heap or min-heap property, useful for priority queues and heapsort.",
        syntax: `PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.add(10);
int min = minHeap.peek();`,
        example: `PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.add(10);
int min = minHeap.peek();`,
        tasks: [
            "Insert and extract min/max from heap.",
            "Implement heap sort on array.",
            "Use heap to find k largest elements.",
        ],
    },
    {
        title: "Hashing",
        explanation:
            "Hash tables provide constant time average lookup by mapping keys to values using hash functions. Handling collisions via chaining or open addressing is critical.",
        syntax: `HashMap<Integer, String> map = new HashMap<>();
map.put(1, "One");
String val = map.get(1);`,
        example: `HashMap<Integer, String> map = new HashMap<>();
map.put(1, "One");
String val = map.get(1);`,
        tasks: [
            "Implement hashmap put/get operations.",
            "Handle collisions via linked list.",
            "Build a set data structure using hashmap.",
        ],
    },
    {
        title: "Strings",
        explanation:
            "Strings are sequences of characters supporting operations like concatenation, search, substring extraction, and pattern matching common in text processing.",
        syntax: `String str = "hello";
int len = str.length();`,
        example: `String str = "hello";
int len = str.length();`,
        tasks: [
            "Check if a string is palindrome.",
            "Count frequency of characters.",
            "Find longest common prefix in array of strings.",
        ],
    },
    {
        title: "Recursion",
        explanation:
            "Recursion solves problems by calling the same function within itself to solve subproblems, enabling elegant solutions in divide-and-conquer, backtracking and tree traversals.",
        syntax: `int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n-1);
}`,
        example: `int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n-1);
}`,
        tasks: [
            "Compute factorial using recursion.",
            "Calculate nth Fibonacci number.",
            "Implement recursive binary search.",
        ],
    },
];

export default function DataStructures() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="p-6 bg-[#171A23] min-h-screen w-full text-white">
            {/* Heading and professor code */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-400">Data Structures</h1>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={professorCode}
                        onChange={(e) => setProfessorCode(e.target.value)}
                        placeholder="Enter Professor Code"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-violet-400 focus:ring"
                    />
                    <button
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold"
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
                Learn fundamental data structures including Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Heaps, Hashing, Strings, and Recursion.
            </p>

            <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {courseConcepts.map((concept, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-shadow">
                        <h3 className="text-yellow-300 text-lg font-bold mb-3">{idx + 1}. {concept.title}</h3>
                        <p className="text-gray-200 mb-3">{concept.explanation}</p>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Syntax:</strong>
                            <pre className="bg-gray-900 p-2 rounded text-xs font-mono whitespace-pre-wrap">{concept.syntax}</pre>
                        </div>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Example:</strong>
                            <pre className="bg-gray-900 p-2 rounded text-xs font-mono whitespace-pre-wrap">{concept.example}</pre>
                        </div>
                        <div>
                            <strong className="text-yellow-400">Tasks:</strong>
                            <ul className="list-disc list-inside space-y-1 text-gray-200 mt-1">
                                {concept.tasks.map((task, i) => (
                                    <li key={i}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-yellow-400 text-2xl font-semibold mb-4">Get Started</h2>
                <p className="mb-6 text-gray-200">
                    Begin your learning journey with these essential data structures. Apply concepts with tasks and deepen your programming skills.
                </p>
            </section>

        </div>
    );
}
