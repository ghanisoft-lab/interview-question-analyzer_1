export default function JDInput({ jobDescription, setJobDescription, resumeText, setResumeText, analyzeJD, loading }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analyze Job Description</h2>
      
      <div className="mb-6">
        <label htmlFor="jd" className="block text-sm font-medium text-gray-700 mb-2">
          Paste Job Description *
        </label>
        <textarea
          id="jd"
          rows="8"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
      </div>
      
      <div className="mb-6">
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
          Upload Resume (Optional - for skill gap analysis)
        </label>
        <textarea
          id="resume"
          rows="6"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your resume text here for personalized skill gap analysis..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">
          This helps us compare your skills with the job requirements
        </p>
      </div>
      
      <button
        onClick={analyzeJD}
        disabled={loading || !jobDescription.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze Job Description'}
      </button>
      
      <p className="text-xs text-gray-500 mt-4">
        By using this tool, you agree to our Terms of Service. Your data is processed securely.
      </p>
    </div>
  )
}