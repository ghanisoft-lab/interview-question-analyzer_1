import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, answer, context } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }

    // Use the correct model name: gemini-2.0-flash
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
    You are an experienced interview coach. Provide constructive feedback on this interview answer.
    
    Question: ${question}
    
    Candidate's Answer: ${answer}
    
    ${context ? `Context from job description: ${JSON.stringify(context).substring(0, 10000)}` : ''}
    
    Please provide feedback focusing on:
    1. Relevance to the question
    2. Use of the STAR method (if applicable)
    3. Clarity and structure
    4. Demonstration of relevant skills
    5. Areas for improvement
    6. Suggestions for a stronger answer
    
    Keep the feedback constructive and professional, limited to 3-4 paragraphs.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text();

    res.status(200).json({ feedback });
  } catch (error) {
    console.error('Error getting interview feedback:', error);
    res.status(500).json({ 
      error: 'Failed to get feedback',
      details: error.message 
    });
  }
}