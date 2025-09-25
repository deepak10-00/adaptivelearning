import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

const courses = [
    { id: 1, slug: 'java-fundamentals', title: 'Java Fundamentals', description: 'Learn Java basics, OOP, and core programming.', category: 'Programming' },
    { id: 2, slug: 'python-basics', title: 'Python Basics', description: 'Start with Python syntax, loops, and functions.', category: 'Programming' },
    { id: 3, slug: 'datastructures', title: 'Data Structures', description: 'Master arrays, linked lists, stacks, and trees.', category: 'Computer Science' },
    { id: 4, slug: 'algorithm', title: 'Algorithms', description: 'Learn sorting, searching, and optimization.', category: 'Computer Science' },
    { id: 5, slug: 'web-development', title: 'Web Development', description: 'HTML, CSS, JS, and frameworks for web apps.', category: 'Programming' },
    { id: 6, slug: 'linear-algebra', title: 'Linear Algebra', description: 'Matrices, vectors, and linear transformations.', category: 'Math' },
    { id: 7, slug: 'calculus', title: 'Calculus', description: 'Differentiation, integration, and limits.', category: 'Math' },
    { id: 8, slug: 'statistics', title: 'Statistics', description: 'Probability, distributions, and inference.', category: 'Math' },
    { id: 9, slug: 'discrete-math', title: 'Discrete Math', description: 'Logic, sets, graphs, and combinatorics.', category: 'Math' },
];

export default function CoursesPage() {
    const { enrolledCourses, handleEnrollCourse } = useOutletContext();
    const navigate = useNavigate();

    const handleStartLearning = (course) => {
        navigate(`/student/courses/${course.slug}`);
    };

    return (
        <div style={{ padding: '1.5rem 3rem' }}>
            <h2 style={{ color: '#7b68ee', marginBottom: '1.5rem' }}>Available Courses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
                {courses.map(course => {
                    const isEnrolled = enrolledCourses.some(c => c.id === course.id);

                    return (
                        <div
                            key={course.id}
                            style={{
                                background: '#1e273a',
                                borderRadius: '10px',
                                padding: '1.5rem',
                                color: 'white',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'default',
                            }}
                        >
                            <h3 style={{ fontWeight: 'bold', color: '#a285f7', marginBottom: '0.5rem' }}>
                                {course.title}
                            </h3>
                            <p style={{ fontStyle: 'italic', marginBottom: '0.7rem', color: '#c6c6f7' }}>
                                {course.description}
                            </p>
                            <div style={{ fontSize: '0.9rem', color: '#9a95e5', marginBottom: '1rem' }}>
                                {course.category}
                            </div>
                            {!isEnrolled ? (
                                <button
                                    onClick={() => handleEnrollCourse(course)}
                                    style={{
                                        background: '#7b68ee',
                                        border: 'none',
                                        padding: '0.5rem 1.2rem',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        marginTop: 'auto',
                                    }}
                                >
                                    Enroll
                                </button>
                            ) : (
                                <>
                                    <button
                                        disabled
                                        style={{
                                            background: '#555',
                                            border: 'none',
                                            padding: '0.5rem 1.2rem',
                                            borderRadius: '6px',
                                            cursor: 'default',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            marginBottom: '0.75rem',
                                            marginTop: 'auto',
                                        }}
                                    >
                                        Enrolled
                                    </button>
                                    <button
                                        onClick={() => handleStartLearning(course)}
                                        style={{
                                            background: '#21cff3',
                                            border: 'none',
                                            padding: '0.5rem 1.2rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            color: '#23253c',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Start Learning
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
