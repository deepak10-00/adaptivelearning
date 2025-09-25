import React, { useState } from "react";

const linearAlgebraConcepts = [
    {
        title: "Vectors",
        explanation: "Vectors are ordered lists of numbers representing points or directions in space. They can be added, scaled, and used to define geometric concepts like lines and planes.",
        code: `double[] v = {1, 2, 3};`,
        example: `double[] vector = {1.0, 2.0, 3.0};
System.out.println("Vector length: " + vector.length);`,
        tasks: [
            "Create vectors and perform addition.",
            "Calculate the dot product of two vectors.",
            "Normalize a vector to unit length."
        ],
    },
    {
        title: "Matrices",
        explanation: "Matrices are rectangular arrays of numbers representing linear transformations and systems of equations. They support operations such as addition, scalar multiplication, and matrix multiplication.",
        code: `double[][] A = {{1, 2}, {3, 4}};`,
        example: `double[][] matrix = {{1, 2}, {3, 4}};
System.out.println("Matrix element: " + matrix[0][1]); // Outputs 2`,
        tasks: [
            "Initialize matrices and perform addition.",
            "Implement matrix multiplication.",
            "Calculate the transpose of a matrix."
        ],
    },
    {
        title: "Linear Transformations",
        explanation: "Linear transformations map vectors from one vector space to another, preserving addition and scalar multiplication properties, often represented with matrices.",
        code: `// Example: Matrix multiplication represents linear transformation`,
        example: `Vector v' = A * v; // A is a matrix, v is a vector`,
        tasks: [
            "Apply a linear transformation using a matrix.",
            "Determine if a transformation is invertible.",
            "Visualize linear transformations in 2D."
        ],
    },
    {
        title: "Determinants",
        explanation: "The determinant of a square matrix provides insight into matrix properties like invertibility and volume scaling factor. It is crucial in solving linear systems and eigenvalue problems.",
        code: `// For 2x2 matrix [[a, b], [c, d]], determinant = ad - bc`,
        example: `double det = A[0][0]*A[1][1] - A[0][1]*A[1][0];`,
        tasks: [
            "Compute determinants of 2x2 and 3x3 matrices.",
            "Understand the significance of a zero determinant.",
            "Use determinants to solve linear systems."
        ],
    },
    {
        title: "Eigenvalues and Eigenvectors",
        explanation: "Eigenvalues and eigenvectors characterize matrices by identifying vectors whose direction remains unchanged under the transformation, scaled by eigenvalues.",
        code: `// Solve Av = λv for eigenvalue λ and eigenvector v`,
        example: `// Eigen computations often use specialized libraries`,
        tasks: [
            "Calculate eigenvalues for 2x2 matrices.",
            "Find eigenvectors corresponding to eigenvalues.",
            "Explore applications of eigen decomposition."
        ],
    },
    {
        title: "Systems of Linear Equations",
        explanation: "Systems of linear equations can be represented as matrix equations (Ax = b) and solved using methods like Gaussian elimination or matrix inversion.",
        code: `// Solve Ax = b using Gaussian elimination`,
        example: `double[][] A = {{1, 2}, {3, 4}};
double[] b = {5, 6};`,
        tasks: [
            "Implement Gaussian elimination.",
            "Solve linear systems using matrix inversion.",
            "Explore inconsistent and dependent systems."
        ],
    },
    {
        title: "Vector Spaces and Subspaces",
        explanation: "Vector spaces are collections of vectors closed under addition and scalar multiplication. Subspaces are subsets that themselves form vector spaces.",
        code: `// Define basis vectors and span linear spaces`,
        example: `// Programming often models vector spaces abstractly`,
        tasks: [
            "Identify subspaces given sets of vectors.",
            "Find basis and dimension of vector spaces.",
            "Explore linear independence and span."
        ],
    },
    {
        title: "Orthogonality and Projections",
        explanation: "Orthogonality means vectors are perpendicular. Projection involves decomposing vectors into components along other vectors, fundamental in least squares and Fourier analysis.",
        code: `// Projection formula: proj_u(v) = (v·u / u·u) * u`,
        example: `// Use dot products to compute projections`,
        tasks: [
            "Check for orthogonal vectors.",
            "Calculate projections onto vectors.",
            "Understand applications in data fitting."
        ],
    },
    {
        title: "Matrix Decompositions",
        explanation: "Techniques like LU, QR, and Singular Value Decomposition break down matrices into products with useful properties for solving systems, optimization, and dimensionality reduction.",
        code: `// Example: A = L * U (LU decomposition)`,
        example: `// Computing decompositions uses libraries like Apache Commons Math`,
        tasks: [
            "Understand the purpose of different decompositions.",
            "Apply LU decomposition to solve linear systems.",
            "Explore SVD in data compression."
        ],
    },
    {
        title: "Applications of Linear Algebra",
        explanation: "Linear algebra underpins machine learning, computer graphics, signal processing, and more. Understanding these foundations enables powerful applications.",
        code: `// Example areas: PCA, 3D graphics transformations, neural networks`,
        example: `// Projects applying linear algebra algorithms`,
        tasks: [
            "Implement principal component analysis (PCA).",
            "Create basic 3D graphics transformations.",
            "Explore linear models in machine learning."
        ],
    },
];

export default function LinearAlgebra() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="p-6 bg-[#171A23] min-h-screen w-full text-white">
            {/* Heading and Professor Connect */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-400">Linear Algebra</h1>
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
                Explore vectors, matrices, transformations, systems of equations, and more. Master core linear algebra concepts applicable in science, engineering, and data analysis.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {linearAlgebraConcepts.map(({ title, explanation, code, example, tasks }, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col hover:scale-105 transition-transform">
                        <h2 className="text-yellow-300 text-lg font-bold mb-3">{idx + 1}. {title}</h2>
                        <p className="text-gray-300 mb-3">{explanation}</p>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Code:</strong>
                            <pre className="bg-gray-900 p-2 rounded text-mono text-xs whitespace-pre-wrap">{code}</pre>
                        </div>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Example:</strong>
                            <pre className="bg-gray-900 p-2 rounded text-mono text-xs whitespace-pre-wrap">{example}</pre>
                        </div>
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
