import './App.scss'

function App() {

  return (
    <>
        <div className="main">
            <div className="bio">
                <div className="corner lc"></div>
                <h1>Jamie Karinen</h1>
                <div className="links">
                    <a href="/jamie-karinen-resume.pdf" target="_blank">Resume</a>
                    <a href="https://linkedin.com/in/jckarinen" target="_blank">LinkedIn</a>
                    <a href="https://github.com/jckarinen" target="_blank">GitHub</a>
                </div>
                <div className="desc">
                    <p>Recent CS grad focused on becoming a half-decent programmer.</p>
                    <p>Most of my paid work experience has been in maintaining a student-written PHP project that somehow turned into a mission-critical application with thousands of daily users and a codebase spanning over a decade.</p>
                    <p>I like web stuff – I've also recently developed an interest in lower-level programming and am currently reinventing wheels from scratch in C.</p>
                    <p>Learning and building every day.</p>
                </div>
                <div className="corner rc"></div>
            </div>
        </div>
    </>
  )
}

export default App
