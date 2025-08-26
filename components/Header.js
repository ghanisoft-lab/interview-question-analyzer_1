export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            Interview Question Analyzer
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Paste a job description and get AI-powered interview questions and insights
          </p>
        </div>
      </div>
    </header>
  );
}