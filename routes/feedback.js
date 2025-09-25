const express = require('express');
const router = express.Router();

// Dummy AI feedback function
function analyzeAnswers(answers) {
    // Replace with real NLP/ML model calls
    return answers.map((answer, index) => ({
        questionIndex: index,
        feedback: answer.length < 10 ? 'Try to give more detailed answers' : 'Good answer',
    }));
}

router.post('/', (req, res) => {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ message: 'Invalid answers' });
    }

    const feedback = analyzeAnswers(answers);
    res.json({ feedback });
});

module.exports = router;
