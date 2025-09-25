const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

router.post('/generate-questions', async (req, res) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    console.log('GEMINI_API_KEY inside route:', GEMINI_API_KEY);

    if (!GEMINI_API_KEY) {
        console.error('API key is missing!');
        return res.status(500).json({ error: 'API key is not configured properly.' });
    }

    const { count, topics } = req.body;

    if (!count || !topics || !Array.isArray(topics)) {
        return res.status(400).json({ error: 'Invalid request body: count and topics are required' });
    }

    try {
        // Updated prompt to request 'topic' and 'correct' fields explicitly
        const prompt = `Generate ${count} multiple-choice questions about computer science and engineering topics: ${topics.join(
            ', '
        )}. Each question must have 4 options. For each question, provide these fields: "question": string, "options": array of 4 strings, "topic": subject string, and "correct": the exact correct option string. Return ONLY a valid JSON array of such objects without any markdown code fences, explanation, or extra text.`;

        console.log('Sending request to Gemini AI API with prompt:', prompt);

        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': GEMINI_API_KEY,
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        console.log('Received response status:', response.status, response.statusText);

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API error response:', data);
            return res.status(response.status).json({ error: data.error || 'Gemini API error' });
        }

        console.log('Full Gemini API response:', JSON.stringify(data, null, 2));

        let rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        if (!rawOutput) {
            return res.status(500).json({ error: 'No text output from AI' });
        }

        console.log('Raw output from AI:', rawOutput);

        // Parse markdown with markdown-it to reliably extract code block content
        const tokens = md.parse(rawOutput, {});
        let cleanJSON = '';

        for (const token of tokens) {
            if (token.type === 'fence' && token.info.trim() === 'json') {
                cleanJSON = token.content;
                break;
            }
        }

        cleanJSON = cleanJSON.trim();

        console.log('Extracted JSON content:', cleanJSON);

        let questions = [];

        try {
            questions = JSON.parse(cleanJSON);
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            return res.status(500).json({
                error: 'Failed to parse questions from AI response',
                parseError: parseError.message,
                rawOutput: cleanJSON,
            });
        }

        return res.json({ questions });
    } catch (error) {
        console.error('Error generating questions:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
