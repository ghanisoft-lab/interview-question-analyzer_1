export default function InterviewQuestions({ analysis }) {
  if (!analysis || !analysis.questions) return null
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Interview Questions for {analysis.roleTitle || 'This Role'}
      </h2>
      
      <div className="space-y-8">
        {analysis.questions.technical && analysis.questions.technical.length > 0 && (
          <div>
            <h3 className="text-xl font-medium text-blue-800 mb-4">Technical Questions</h3>
            <div className="space-y-4">
              {analysis.questions.technical.map((question, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium">{question.question}</p>
                  {question.sampleAnswer && (
                    <div className="mt-2 bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Sample Answer:</p>
                      <p className="text-sm text-gray-600 mt-1">{question.sampleAnswer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {analysis.questions.behavioral && analysis.questions.behavioral.length > 0 && (
          <div>
            <h3 className="text-xl font-medium text-blue-800 mb-4">Behavioral Questions</h3>
            <div className="space-y-4">
              {analysis.questions.behavioral.map((question, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium">{question.question}</p>
                  {question.sampleAnswer && (
                    <div className="mt-2 bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Sample Answer (STAR Format):</p>
                      <p className="text-sm text-gray-600 mt-1">{question.sampleAnswer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {analysis.questions.situational && analysis.questions.situational.length > 0 && (
          <div>
            <h3 className="text-xl font-medium text-blue-800 mb-4">Situational Questions</h3>
            <div className="space-y-4">
              {analysis.questions.situational.map((question, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="font-medium">{question.question}</p>
                  {question.sampleAnswer && (
                    <div className="mt-2 bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Sample Approach:</p>
                      <p className="text-sm text-gray-600 mt-1">{question.sampleAnswer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {analysis.questions.culture && analysis.questions.culture.length > 0 && (
          <div>
            <h3 className="text-xl font-medium text-blue-800 mb-4">Culture Fit Questions</h3>
            <div className="space-y-4">
              {analysis.questions.culture.map((question, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="font-medium">{question.question}</p>
                  {question.sampleAnswer && (
                    <div className="mt-2 bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700">Sample Answer:</p>
                      <p className="text-sm text-gray-600 mt-1">{question.sampleAnswer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}