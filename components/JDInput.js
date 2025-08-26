import { useState } from 'react';

export default function JDInput({ jobDescription, setJobDescription, resumeText, setResumeText, analyzeJD, loading }) {
  const [activeTab, setActiveTab] = useState('jd');

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Interview Question Analyzer</h1>
        <p className="text-gray-600 text-lg">Paste a job description and get AI-powered interview questions and insights</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium text-sm ${activeTab === 'jd' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('jd')}
        >
          Job Description
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm ${activeTab === 'resume' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('resume')}
        >
          Resume (Optional)
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Job Description Input */}
        <div className={activeTab === 'jd' ? 'block' : 'hidden'}>
          <div className="mb-1 flex justify-between items-center">
            <label htmlFor="jd" className="block text-sm font-medium text-gray-700">
              Paste Job Description *
            </label>
            <span className="text-xs text-gray-500">{jobDescription.length} characters</span>
          </div>
          <div className="relative">
            <textarea
              id="jd"
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm min-h-[200px]"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            {jobDescription.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-gray-400 text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">Paste job description above</p>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            We'll analyze this to generate relevant interview questions
          </p>
        </div>
        
        {/* Resume Input */}
        <div className={activeTab === 'resume' ? 'block' : 'hidden'}>
          <div className="mb-1 flex justify-between items-center">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Upload Resume (Optional - for skill gap analysis)
            </label>
            <span className="text-xs text-gray-500">{resumeText.length} characters</span>
          </div>
          <div className="relative">
            <textarea
              id="resume"
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm min-h-[180px]"
              placeholder="Paste your resume text here for personalized skill gap analysis..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            {resumeText.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-gray-400 text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm">Paste your resume for skill gap analysis</p>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This helps us compare your skills with the job requirements
          </p>
        </div>
        
        {/* Analyze Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={analyzeJD}
            disabled={loading || !jobDescription.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Analyze Job Description'
            )}
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By using this tool, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>. 
              Your data is processed securely and never stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}