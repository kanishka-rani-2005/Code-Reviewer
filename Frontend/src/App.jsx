

import { useState,useEffect } from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import prism from 'prismjs'
import axios from 'axios'
import ReactMarkdown from "react-markdown";


const API =
  import.meta.env.VITE_API_LINK ||  "http://localhost:3000/ai/get-review/";

console.log("API:", API);
function App() {
  const [code, setCode] = useState(`function greet(name) {
  return \`Hello, \${name}!\`;
}`)
  
  useEffect(()=>{
    prism.highlightAll()
  })
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function reviewCode() {
    setLoading(true);

    try {
      const res = await axios.post(API, { code });
      console.log(res)
      setResponse(res.data);
    } catch (err) {
      console.log(err.response);
      console.log(err.response?.data);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Code Review Assistant</p>
        <h1>Review and improve your code</h1>
      </header>

      <main className="workspace">
        <section className="panel panel-input">
          <div className="panel-heading">
            <h2>Code Input</h2>
            <button onClick={reviewCode} disabled={loading}>
                {loading ? "Reviewing..." : "Get Response"}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck={false}
          />
        </section>

        <section className="panel panel-output">
          <div className="panel-heading">
            <h2>Response</h2>
          </div>
          <div className="response-box">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
