import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

export async function analyzeJobDescription(jobDescription, resumeText = '') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
    Analyze this job description and provide a structured analysis. If a resume is provided, include a skill gap analysis.
    
    Job Description:
    ${jobDescription}
    
    ${resumeText ? `Resume Text: ${resumeText}` : ''}
    
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
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse AI response')
    }

    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Error analyzing with Gemini:', error)
    throw error
  }
}

export async function getInterviewFeedback(question, answer, context = null) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
    You are an experienced interview coach. Provide constructive feedback on this interview answer.
    
    Question: ${question}
    
    Candidate's Answer: ${answer}
    
    ${context ? `Context from job description: ${JSON.stringify(context)}` : ''}
    
    Please provide feedback focusing on:
    1. Relevance to the question
    2. Use of the STAR method (if applicable)
    3. Clarity and structure
    4. Demonstration of relevant skills
    5. Areas for improvement
    6. Suggestions for a stronger answer
    
    Keep the feedback constructive and professional, limited to 3-4 paragraphs.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error getting feedback from Gemini:', error)
    throw error
  }
}