import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [active, setActive] = useState({});

  const handleClick = (e) => {
    const [displayedJob] = jobs.filter(job => job.company === e.target.textContent);
    setActive(displayedJob);
  }

  useEffect(function() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setActive(data[0]);
        setLoading(false);
      })
      .catch(err => console.error(err))
  }, [])

  if (loading) {
    return (
      <main className="section title">
        <h1>Loading...</h1>
      </main>
    )
  }
  
  return (
    <main className="section">
      <header className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </header>
      <div className="jobs-center">
        <nav className="btn-container">
        {jobs.map(job => {
          return (
            <button
              className={`job-btn${active.title === job.title ? " active-btn" : ""}`}
              onClick={handleClick}
              key={job.id}>{job.company}</button>
          )
        })}
        </nav>
        <article className="job-info">
          <h3>{active.title}</h3>
          <h4>{active.company}</h4>
          <p className="job-date">{active.dates}</p>
          <ul>
            {active.duties.map((duty, index) => {
              return (
                <li className="job-desc" key={index}>
                  <i className="job-icon"><FaAngleDoubleRight /></i>
                  <p>{duty}</p>
                </li>
              )
            })}
          </ul>
        </article>
      </div>
      <button className="btn">more info</button>
    </main>
  )
}

export default App
