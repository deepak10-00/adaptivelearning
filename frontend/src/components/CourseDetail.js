import React from 'react';
import { useParams } from 'react-router-dom';

// Import your separate course page components
import JavaFundamentalsPage from './JavaFundamentals';
import PythonBasicsPage from './PythonBasics';
import DataStructures from './DataStructure';
import Algorithms from './Algorithms';
import WebDevelopment from './WebDevelopment';
import LinearAlgebra from './LinearAlgebra';
import Calculus from './Calculus';
import Statistics from './Statistics';
import DiscreteMath from './DiscreteMath';
// Import other course pages similarly
// import DataStructuresPage from './DataStructuresPage'
// import AlgorithmsPage from './AlgorithmsPage'
// ...

// Map slugs to course components
const coursePagesMap = {
    'java-fundamentals': JavaFundamentalsPage,
    'python-basics': PythonBasicsPage,
     'datastructures': DataStructures,
     'algorithm': Algorithms,
    'web-development': WebDevelopment,
    'linear-algebra': LinearAlgebra,
    'calculus': Calculus,
    'statistics': Statistics,
    'discrete-math': DiscreteMath,
    // Add other slug-component mappings as needed
};

export default function CourseDetail() {
    const { courseId } = useParams();

    // Choose the correct component to render based on slug
    const CourseComponent = coursePagesMap[courseId];

    if (!CourseComponent) {
        return (
            <div style={{ padding: '2rem', color: 'white' }}>
                Course not found.
            </div>
        );
    }

    // Render the selected course page component
    return <CourseComponent />;
}
