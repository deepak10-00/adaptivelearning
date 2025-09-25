import React, { useState } from "react";

const statisticsConcepts = [
    {
        title: "Probability",
        explanation:
            "Probability quantifies the likelihood of an event occurring between 0 (impossible) and 1 (certain). It forms the foundation for modeling random processes and uncertainty.",
        code: `P(A) = Number of favorable outcomes / Total number of outcomes`,
        example: `// Probability of rolling a 3 on a fair die
P(3) = 1/6`,
        tasks: [
            "Calculate probabilities for drawing cards from a deck.",
            "Write a program to simulate coin tosses and probability outcomes.",
            "Explore conditional probability problems.",
        ],
    },
    {
        title: "Distributions",
        explanation:
            "Distributions describe how probabilities are assigned to different outcomes. Common types include Normal, Binomial, and Poisson distributions.",
        code: `// Example: Normal distribution with mean μ and std deviation σ`,
        example: `// Standard Normal PDF: f(x) = (1/√(2π)) * e^(-x²/2)`,
        tasks: [
            "Plot and analyze the normal distribution.",
            "Compute probabilities using the binomial distribution formula.",
            "Understand Poisson distribution for rare events.",
        ],
    },
    {
        title: "Hypothesis Testing",
        explanation:
            "Statistical test to determine whether there is enough evidence to reject a null hypothesis about a population parameter.",
        code: `// t-test and chi-square test`,
        example: `// One-sample t-test to compare sample mean to population mean`,
        tasks: [
            "Perform hypothesis tests on sample data.",
            "Interpret p-values and significance levels.",
            "Apply chi-square tests for categorical data.",
        ],
    },
    {
        title: "Descriptive Statistics",
        explanation:
            "Summarizes key characteristics of data sets such as central tendency, variability, and distribution shape.",
        code: `Mean = (Σx)/n, Variance = Σ(x - μ)² / n`,
        example: `// Compute mean of dataset [1,2,3,4,5] = 3`,
        tasks: [
            "Calculate mean, median, and mode.",
            "Determine variance and standard deviation.",
            "Create visualizations like histograms or box plots.",
        ],
    },
    {
        title: "Regression Analysis",
        explanation:
            "Models the relationship between dependent and independent variables to predict outcomes.",
        code: `// Simple linear regression: y = mx + c`,
        example: `// Fit line minimizing squared errors`,
        tasks: [
            "Fit a linear regression model to data.",
            "Interpret regression coefficients.",
            "Evaluate model accuracy and goodness-of-fit.",
        ],
    },
    {
        title: "Bayesian Statistics",
        explanation:
            "Uses prior knowledge combined with observed data to update probabilities, allowing probabilistic inference.",
        code: `Posterior ∝ Likelihood × Prior`,
        example: `P(A|B) = [P(B|A) * P(A)] / P(B)`,
        tasks: [
            "Apply Bayes theorem to medical diagnosis examples.",
            "Compare Bayesian inference with classical methods.",
            "Learn about prior and posterior distributions.",
        ],
    },
    {
        title: "Sampling Methods",
        explanation:
            "Techniques to select representative subsets of populations to infer characteristics without full enumeration.",
        code: `// Simple random & stratified sampling`,
        example: `// Draw samples and compute sample means`,
        tasks: [
            "Design sampling schemes for surveys.",
            "Implement random and stratified sampling.",
            "Discuss sampling biases and how to avoid them.",
        ],
    },
    {
        title: "Confidence Intervals",
        explanation:
            "Ranges of values around a statistic that likely contain the population parameter with a given confidence level.",
        code: `CI = estimate ± margin of error`,
        example: `95% CI for mean age: 30 ± 2`,
        tasks: [
            "Calculate confidence intervals for means and proportions.",
            "Interpret confidence levels correctly.",
            "Practice with different sample sizes.",
        ],
    },
    {
        title: "Nonparametric Tests",
        explanation:
            "Statistical tests not reliant on parametric distribution assumptions, useful for ordinal or small sample data.",
        code: `// Examples: Mann-Whitney U, Wilcoxon signed-rank`,
        example: `// Test for median differences in two groups`,
        tasks: [
            "Use nonparametric tests with skewed data.",
            "Compare nonparametric to parametric test results.",
            "Apply tests to real-world datasets.",
        ],
    },
    {
        title: "Time Series Analysis",
        explanation:
            "Analyzing data points listed in chronological order to identify trends, seasonality, and forecast future values.",
        code: `// Moving averages and ARIMA models`,
        example: `// Forecast monthly sales`,
        tasks: [
            "Compute moving average for noisy data.",
            "Decompose series into trend and seasonal components.",
            "Implement a simple forecasting model.",
        ],
    },
];

export default function Statistics() {
    const [professorCode, setProfessorCode] = useState("");

    return (
        <div className="p-6 bg-[#171A23] min-h-screen w-full text-white">
            {/* Header and Connect box */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-400">Statistics</h1>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={professorCode}
                        onChange={(e) => setProfessorCode(e.target.value)}
                        placeholder="Enter Professor Code"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring focus:ring-violet-500 outline-none"
                    />
                    <button
                        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300"
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
                Study probability theory, distributions, hypothesis testing, regression, sampling, and time series analysis fundamental to data science and research.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {statisticsConcepts.map(({ title, explanation, code, example, tasks }, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
                        <h3 className="text-yellow-300 font-bold text-lg mb-3">{idx + 1}. {title}</h3>
                        <p className="text-gray-300 mb-3">{explanation}</p>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Formula/Code:</strong>
                            <pre className="bg-gray-900 p-2 rounded text-mono whitespace-pre-wrap text-sm">{code}</pre>
                        </div>
                        <div className="mb-3">
                            <strong className="text-yellow-400">Example:</strong>
                            <pre className="bg-gray-900 p-2 rounded text-mono whitespace-pre-wrap text-sm">{example}</pre>
                        </div>
                        <div>
                            <strong className="text-yellow-400">Tasks:</strong>
                            <ul className="list-disc list-inside space-y-1 mt-1 text-gray-300">
                                {tasks.map((task, i) => <li key={i}>{task}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
