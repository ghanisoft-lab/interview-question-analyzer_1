export default function RoleInsights({ analysis }) {
  if (!analysis) return null
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Role Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-3">Job Title</h3>
          <p className="text-gray-700">{analysis.roleTitle || 'Not specified'}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-3">Experience Level</h3>
          <p className="text-gray-700">{analysis.experienceLevel || 'Not specified'}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Required Skills</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.skills?.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Tools & Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.tools?.map((tool, index) => (
            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {tool}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Soft Skills</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.softSkills?.map((skill, index) => (
            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {analysis.industry && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Industry</h3>
          <p className="text-gray-700">{analysis.industry}</p>
        </div>
      )}
    </div>
  )
}