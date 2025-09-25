import React, { useState } from "react";

const calculusConcepts = [
    {
        title: "Limits",
        explanation:
            "Limits describe the behavior of a function as its input approaches a particular point, fundamental to the definition of derivatives and continuity.",
        formula: "lim(x→a) f(x) = L",
        example: "lim(x→2) (3x + 1) = 7",
        tasks: [
            "Calculate limits for polynomial functions.",
            "Investigate limits involving infinity.",
            "Explore continuity at a point using limits.",
        ],
    },
    {
        title: "Derivatives",
        explanation:
            "Derivatives represent the instantaneous rate of change or slope of a function's graph, fundamental for understanding motion, optimization and change.",
        formula: "f'(x) = lim(h→0) [f(x+h) - f(x)] / h",
        example: "If f(x)=x², then f'(x)=2x",
        tasks: [
            "Compute derivatives of polynomials.",
            "Apply the power and chain rules.",
            "Find the slope of tangent lines at given points.",
        ],
    },
    {
        title: "Integration",
        explanation:
            "Integration calculates the accumulation of quantities, such as areas under curves and total change over an interval.",
        formula: "∫ f(x) dx",
        example: "∫ x dx = (1/2) x² + C",
        tasks: [
            "Compute definite and indefinite integrals.",
            "Apply substitution and integration by parts.",
            "Solve area problems using integration.",
        ],
    },
    {
        title: "Fundamental Theorem of Calculus",
        explanation:
            "Connects differentiation and integration, showing that differentiation is the inverse operation of integration.",
        formula: "d/dx ∫_a^x f(t) dt = f(x)",
        example: "If F(x) = ∫_0^x t² dt, then F'(x) = x²",
        tasks: [
            "Understand and verify the theorem with examples.",
            "Use it to evaluate definite integrals.",
            "Apply it in physical contexts like displacement.",
        ],
    },
    {
        title: "Partial Derivatives",
        explanation:
            "Partial derivatives measure the rate of change of multivariate functions with respect to one variable, holding others constant.",
        formula: "∂f/∂x, ∂f/∂y",
        example: "For f(x,y)=x²y, ∂f/∂x=2xy, ∂f/∂y=x²",
        tasks: [
            "Compute partial derivatives for multivariable functions.",
            "Interpret gradients and directional derivatives.",
            "Apply in optimization problems.",
        ],
    },
    {
        title: "Multivariable Integration",
        explanation:
            "Extends single-variable integration to functions of several variables, computing volumes, mass, and probability over regions.",
        formula: "∬ f(x,y) dx dy",
        example: "Compute ∬_R (x² + y²) dA over specified region R",
        tasks: [
            "Set up and evaluate double integrals.",
            "Practice changing integration order.",
            "Apply to physics problems involving density.",
        ],
    },
    {
        title: "Series and Sequences",
        explanation:
            "Study sequences of numbers and their infinite sums (series), vital for approximations and solving differential equations.",
        formula: "∑_{n=1}^∞ a_n",
        example: "Geometric series: ∑ rⁿ = 1/(1-r), |r|<1",
        tasks: [
            "Test convergence of series.",
            "Find sum of infinite series.",
            "Use Taylor and Maclaurin series expansions.",
        ],
    },
    {
        title: "Differential Equations",
        explanation:
            "Equations involving derivatives expressing dynamic systems; solutions describe processes across physics, biology, and engineering.",
        formula: "dy/dx = f(x, y)",
        example: "dy/dx = ky leads to exponential growth/decay",
        tasks: [
            "Solve first-order separable differential equations.",
            "Explore applications in population dynamics.",
            "Simulate simple physical systems.",
        ],
    },
    {
        title: "Limits and Continuity",
        explanation:
            "Explore continuity of functions, where limits and function values align, ensuring predictable behavior of graphs.",
        formula: "f is continuous at c if lim(x→c) f(x) = f(c)",
        example: "Verify continuity of f(x) = x² at x=2",
        tasks: [
            "Determine points of continuity.",
            "Analyze discontinuities and classify types.",
            "Work on piecewise functions.",
        ],
    },
    {
        title: "Optimization",
        explanation:
            "Use calculus techniques to find maxima and minima of functions, essential in economics, physics, and engineering.",
        formula: "Set f'(x) = 0 to find critical points",
        example: "Find max height of projectile trajectory",
        tasks: [
            "Find critical points of functions.",
            "Classify maxima/minima using second derivative.",
            "Apply optimization to real-world problems.",
        ],
    },
];

export default function Calculus() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="p-6 bg-[#171A23] min-h-screen w-full text-white">
            {/* Heading and Professor Connect */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-400">Calculus</h1>
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

            <p className="mb-6 text-lg">
                Dive deep into differentiation, integration, partial derivatives, sequences, and their vast applications in science and engineering.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {calculusConcepts.map((concept, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl p-6 shadow-lg transition transform hover:scale-105">
                        <h3 className="text-yellow-300 font-bold text-lg mb-3">{idx + 1}. {concept.title}</h3>
                        <p className="text-gray-300 mb-3">{concept.explanation}</p>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Formula:</strong>
                            <pre className="bg-gray-900 p-2 rounded whitespace-pre-wrap font-mono text-sm text-white">{concept.formula}</pre>
                        </div>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Example:</strong>
                            <pre className="bg-gray-900 p-2 rounded whitespace-pre-wrap font-mono text-sm text-white">{concept.example}</pre>
                        </div>
                        <div>
                            <strong className="text-yellow-400">Tasks:</strong>
                            <ul className="list-disc list-inside text-gray-300 mt-1 space-y-1">
                                {concept.tasks.map((task, i) => (
                                    <li key={i}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
