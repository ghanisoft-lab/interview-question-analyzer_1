import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { jobDescription, resumeText } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // Check if API key is available
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Use the correct model name: gemini-2.0-flash
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Create a prompt for analysis
    const prompt = `
    Analyze this job description and provide a structured analysis. If a resume is provided, include a skill gap analysis.
    
    Job Description:
    ${jobDescription.substring(0, 30000)}  // Limit length to avoid token limits
    
    ${resumeText ? `Resume Text: ${resumeText.substring(0, 15000)}` : ''}
    
    Please provide a JSON response with the following structure:
    {
      "roleTitle": "Extracted job title",
      "experienceLevel": "Entry-level/Mid-level/Senior/Not specified",
      "skills": ["list", "of", "required", "hard", "skills"],
      "tools": ["list", "of", "tools", "technologies"],
      "softSkills": ["list", "of", "soft", "skills"],
      "industry": "Industry if detectable",
      "questions": {
        "technical": [{"question": "technical question 1", "sampleAnswer": "sample answer or framework"}],
        "behavioral": [{"question": "behavioral question 1", "sampleAnswer": "STAR-formatted sample answer"}],
        "situational": [{"question": "situational question 1", "sampleAnswer": "sample approach"}],
        "culture": [{"question": "culture fit question 1", "sampleAnswer": "sample answer"}]
      },
      "skillGaps": {
        "missingSkills": [{"skill": "skill name", "recommendations": "learning recommendations"}],
        "existingSkills": ["list", "of", "matching", "skills"],
        "resources": [{"title": "resource title", "description": "resource description", "link": "optional link"}]
      }
    }
    
    Generate 3-5 questions for each category. For skill gap analysis, be constructive and provide learning recommendations.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response (Gemini might add some conversational text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Could not parse AI response:', text);
      return res.status(500).json({ error: 'Could not parse AI response' });
    }

    try {
      const analysis = JSON.parse(jsonMatch[0]);
      res.status(200).json(analysis);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Text:', jsonMatch[0]);
      res.status(500).json({ error: 'Failed to parse AI response as JSON' });
    }
  } catch (error) {
    console.error('Error analyzing job description:', error);
    res.status(500).json({ 
      error: 'Failed to analyze job description',
      details: error.message 
    });
  }
}