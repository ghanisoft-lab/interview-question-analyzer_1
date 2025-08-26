import { useState } from 'react'

export default function PracticeMode({ analysis }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  if (!analysis || !analysis.questions) return null
  
  // Combine all questions
  const allQuestions = [
    ...(analysis.questions.technical || []),
    ...(analysis.questions.behavioral || []),
    ...(analysis.questions.situational || []),
    ...(analysis.questions.culture || [])
  ]
  
  if (allQuestions.length === 0) return null
  
  const currentQuestion = allQuestions[currentQuestionIndex]
  
  const getFeedback = async () => {
    if (!userAnswer.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion.question,
          answer: userAnswer,
          context: analysis
        }),
      })
      
      const data = await response.json()
      setFeedback(data.feedback)
    } catch (error) {
      console.error('Error getting feedback:', error)
      setFeedback('Sorry, there was an error getting feedback. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % allQuestions.length)
    setUserAnswer('')
    setFeedback('')
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Practice Interview Mode</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-lg font-medium text-blue-800">Question {currentQuestionIndex + 1} of {allQuestions.length}</p>
        <p className="text-gray-700 mt-2">{currentQuestion.question}</p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
          Your Answer
        </label>
        <textarea
          id="answer"
          rows="6"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        ></textarea>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={getFeedback}
          disabled={isLoading || !userAnswer.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Getting Feedback...' : 'Get Feedback'}
        </button>
        
        <button
          onClick={nextQuestion}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Next Question
        </button>
      </div>
      
      {feedback && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">AI Feedback</h3>
          <p className="text-gray-700">{feedback}</p>
        </div>
      )}
    </div>
  )
}