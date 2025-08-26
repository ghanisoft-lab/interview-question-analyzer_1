export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-blue-800">
          Interview Question Analyzer
        </h1>
        <p className="text-gray-600 mt-2">
          Paste a job description and get AI-powered interview questions and insights
        </p>
      </div>
    </header>
  )
}