import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export default function ExportOptions({ analysis, sessionId }) {
  const contentRef = useRef()
  
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `Interview Questions - ${analysis.roleTitle || 'Job Description Analysis'}`,
  })
  
  const exportToWord = () => {
    // This would be implemented with a proper Word export library
    alert('Word export functionality would be implemented here')
  }
  
  const shareLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/results/${sessionId}`
  
  if (!analysis) return null
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Export & Share Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download PDF
        </button>
        
        <button
          onClick={exportToWord}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Export to Word
        </button>
        
        <button
          onClick={() => navigator.clipboard.writeText(shareLink)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Copy Share Link
        </button>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shareable Link
        </label>
        <div className="flex">
          <input
            type="text"
            readOnly
            value={shareLink}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareLink)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-r-md"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          This link will allow others to view these results
        </p>
      </div>
      
      {/* Hidden content for printing */}
      <div className="hidden">
        <div ref={contentRef} className="p-8">
          <h1 className="text-3xl font-bold mb-4">Interview Questions Analysis</h1>
          <p className="text-gray-600 mb-6">Generated from job description analysis</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Role Insights</h2>
          <p><strong>Job Title:</strong> {analysis.roleTitle || 'Not specified'}</p>
          <p><strong>Experience Level:</strong> {analysis.experienceLevel || 'Not specified'}</p>
          
          <h3 className="text-xl font-bold mt-6 mb-2">Required Skills</h3>
          <ul className="list-disc pl-5">
            {analysis.skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          
          <h3 className="text-xl font-bold mt-6 mb-2">Tools & Technologies</h3>
          <ul className="list-disc pl-5">
            {analysis.tools?.map((tool, index) => (
              <li key={index}>{tool}</li>
            ))}
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Interview Questions</h2>
          
          {analysis.questions.technical && analysis.questions.technical.length > 0 && (
            <>
              <h3 className="text-xl font-bold mt-6 mb-2">Technical Questions</h3>
              <ol className="list-decimal pl-5">
                {analysis.questions.technical.map((question, index) => (
                  <li key={index} className="mb-4">
                    <p className="font-medium">{question.question}</p>
                    {question.sampleAnswer && (
                      <div className="ml-4 mt-2">
                        <p className="font-medium">Sample Answer:</p>
                        <p>{question.sampleAnswer}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </>
          )}
          
          {analysis.questions.behavioral && analysis.questions.behavioral.length > 0 && (
            <>
              <h3 className="text-xl font-bold mt-6 mb-2">Behavioral Questions</h3>
              <ol className="list-decimal pl-5">
                {analysis.questions.behavioral.map((question, index) => (
                  <li key={index} className="mb-4">
                    <p className="font-medium">{question.question}</p>
                    {question.sampleAnswer && (
                      <div className="ml-4 mt-2">
                        <p className="font-medium">Sample Answer (STAR Format):</p>
                        <p>{question.sampleAnswer}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </>
          )}
          
          <p className="text-sm text-gray-500 mt-12">
            Generated by Interview Question Analyzer - {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}