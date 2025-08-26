export default function SkillGapAnalysis({ analysis }) {
  if (!analysis || !analysis.skillGaps) return null
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Skill Gap Analysis</h2>
      
      {analysis.skillGaps.missingSkills && analysis.skillGaps.missingSkills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-medium text-red-700 mb-4">Missing Skills</h3>
          <div className="space-y-3">
            {analysis.skillGaps.missingSkills.map((skill, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 font-medium">{skill.skill}</p>
                  {skill.recommendations && (
                    <p className="text-sm text-gray-600 mt-1">{skill.recommendations}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {analysis.skillGaps.existingSkills && analysis.skillGaps.existingSkills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-medium text-green-700 mb-4">Your Matching Skills</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.skillGaps.existingSkills.map((skill, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {analysis.skillGaps.resources && analysis.skillGaps.resources.length > 0 && (
        <div>
          <h3 className="text-xl font-medium text-blue-700 mb-4">Learning Resources</h3>
          <div className="space-y-4">
            {analysis.skillGaps.resources.map((resource, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium">{resource.title}</p>
                <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                {resource.link && (
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 block">
                    Learn more
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}