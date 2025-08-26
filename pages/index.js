import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import JDInput from '../components/JDInput'
import RoleInsights from '../components/RoleInsights'
import InterviewQuestions from '../components/InterviewQuestions'
import SkillGapAnalysis from '../components/SkillGapAnalysis'
import PracticeMode from '../components/PracticeMode'
import ExportOptions from '../components/ExportOptions'

export default function Home() {
  const [jobDescription, setJobDescription] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('input')
  const [sessionId, setSessionId] = useState(null)

  const analyzeJD = async () => {
    if (!jobDescription.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          resumeText
        }),
      })
      
      const data = await response.json()
      setAnalysis(data)
      setActiveTab('insights')
      
      // Generate a session ID for sharing
      setSessionId(Date.now().toString(36) + Math.random().toString(36).substr(2))
    } catch (error) {
      console.error('Error analyzing job description:', error)
      alert('Failed to analyze job description. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Interview Question Analyzer from Job Descriptions</title>
        <meta name="description" content="Analyze job descriptions and generate tailored interview questions with AI-powered insights" />
        <meta name="keywords" content="interview questions, job description analyzer, interview preparation, career development, job search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'input' && (
          <JDInput 
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            resumeText={resumeText}
            setResumeText={setResumeText}
            analyzeJD={analyzeJD}
            loading={loading}
          />
        )}
        
        {analysis && (
          <div className="mt-8">
            <div className="flex border-b">
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'insights' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('insights')}
              >
                Role Insights
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'questions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('questions')}
              >
                Interview Questions
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'gaps' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('gaps')}
              >
                Skill Gaps
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'practice' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('practice')}
              >
                Practice Mode
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'export' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('export')}
              >
                Export
              </button>
            </div>
            
            <div className="mt-6">
              {activeTab === 'insights' && <RoleInsights analysis={analysis} />}
              {activeTab === 'questions' && <InterviewQuestions analysis={analysis} />}
              {activeTab === 'gaps' && <SkillGapAnalysis analysis={analysis} />}
              {activeTab === 'practice' && <PracticeMode analysis={analysis} />}
              {activeTab === 'export' && <ExportOptions analysis={analysis} sessionId={sessionId} />}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}