import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import HealthStatus from './components/HealthStatus';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm Jay's AI assistant. Ask me anything about Jay's background, skills, experience, or interests!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversation_history: messages.slice(1).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.response
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: `Sorry, I encountered an error: ${data.error || 'Unknown error'}`
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I cannot connect to the server right now. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="portfolio-app">
      {/* Header Section with AI Chat */}
      <header className="portfolio-header">
        <div className="header-content">
          <div className="intro-text">
            <h1>HI, I am Jay,</h1>
            <p>I am a software developer with skills in Front end as well as Back end Technologies.</p>
          </div>
          
          <div className="ai-chat-section">
            <div className="chat-toggle" onClick={() => setIsChatExpanded(!isChatExpanded)}>
              <span>💬 Chat with Jay's AI</span>
              <span className="toggle-arrow">{isChatExpanded ? '▼' : '▲'}</span>
            </div>
            
            {isChatExpanded && (
              <div className="chat-container">
                <div className="chat-header">
                  <HealthStatus />
                  <h3>Jay's AI Assistant</h3>
                  <p>Ask me anything about Jay!</p>
                </div>
                
                <div className="messages-container">
                  {messages.map((message) => (
                    <div key={message.id} className={`message ${message.role}`}>
                      <div className="message-content">
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="message assistant">
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="input-container">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about Jay..."
                    disabled={isLoading}
                    rows={1}
                  />
                  <button 
                    onClick={sendMessage} 
                    disabled={!inputMessage.trim() || isLoading}
                    className="send-button"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Portfolio Content */}
      <main className="portfolio-content">
        {/* Career Objective */}
        <section className="portfolio-section">
          <h2>CAREER OBJECTIVE</h2>
          <p>To work in a challenging and creative environment and to obtain a position that promotes self-learning and professional Development while making positive Contributions for the Institution.</p>
        </section>

        {/* Education */}
        <section className="portfolio-section">
          <h2>Education</h2>
          <div className="education-item">
            <h3>University of Texas at Arlington, Texas – Master's in Computer Science - 3.8/4</h3>
            <p>Courses: Design & Analysis of Algorithms, Data Analysis and Modelling techniques, Database Systems, Advanced Database Systems- Cloud computing, Artificial Intelligence, Machine Learning, Software Engineering –1, Computer Networks</p>
          </div>
          <div className="education-item">
            <h3>Bachelor's In Computer Engineering – Gujarat Technological University – 8.91/10</h3>
          </div>
        </section>

        {/* Work Experience */}
        <section className="portfolio-section">
          <h2>Work Experience</h2>
          <div className="experience-item">
            <h3>Software Development & Engineering Intern – Schwab Technology Services</h3>
            <ul>
              <li>Migrated Client services libraries from internal to <strong>EMOST</strong>, aiding in the creation of a new environment capable of password-free authentication.</li>
              <li>Worked on Researching and documenting for the PAT team ensuring it would be simpler for them to utilize, understand and use the new <strong>AUTHENTICATION</strong> methods developed by different teams.</li>
            </ul>
          </div>
          <div className="experience-item">
            <h3>Admissions Assistant Intern, University of Texas at Arlington – Office of Admissions</h3>
            <ul>
              <li>Student assistant for the office of Enrollment Management and Admissions.</li>
              <li>Duties: Leading a team of eight employees, delegating tasks, and providing training, which increased call-taking efficiency by 14%. producing productivity reports, managing, and taking part in various call campaigns. teaching new hires about customer support and office cloud services.</li>
            </ul>
          </div>
          <div className="experience-item">
            <h3>Back-end Developer Intern, Infotrex Services Pvt. Ltd, Ahmedabad, Gujarat</h3>
            <ul>
              <li>Studied tests and understood code for a web-application on a customer's book selling portal. Interacted with customers for requirement analysis & Updates on database design.</li>
              <li>Did coding work on server-side configuration with PHP along with some front-end technologies like HTML, CSS. Then finalized it with testing and deploying code to the website.</li>
            </ul>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="portfolio-section">
          <h2>Blog Posts</h2>
          <div className="blog-posts">
            <h3>Titanic Survivor Prediction using Random Forest Classifier</h3>
            <h3>Facial Emotion Expressions Prediction using CNN and Pytorch</h3>
            <h3>Rotten Tomatoes Reviews Classification using naive Bayes Classifier</h3>
            <h3>Main Project</h3>
          </div>
        </section>

        {/* Technical Projects */}
        <section className="portfolio-section">
          <h2>Technical Projects</h2>
          <div className="project-item">
            <h3>Art Gallery Web Application</h3>
            <p>A Flask Web application which was built keeping in mind art galleries, artists, artworks, payments, customers, states etc. Depending on their interest user could fetch, update, or delete data. We also implemented methodologies on how to Design, Create and Maintain Database. Along with using PyFlask, HTML, CSS, and JavaScript for front-end web development and functions, we also incorporated supporting capabilities that would only select specific data with constraints that might aid in data analysis.</p>
          </div>
          <div className="project-item">
            <h3>Fit.AI</h3>
            <p>Developed a one-step portal for all Fitness and Diet Domains. A web application which utilizes google fit data and implemented graph on that JSON data to help user understand and analyze their consistency in weeks, months, and years using WordPress. Our website showed some of the quick recipes and exercises videos that the user could follow. Deployed our website on AWS.</p>
          </div>
          <div className="project-item">
            <h3>Sports Club Management System</h3>
            <p>Implemented software that saved all client information in a database accessible through MYSQL. Java keeps track of members' memberships and informs them about upcoming events and subscription expiration of memberships also stored information about checking in and out. Also, using React and JAVA, I designed an interactive front end that displayed the clock in and clock out times of members. The admins used this to monitor machine wear and tear and Time club maintenance.</p>
          </div>
          <div className="project-item">
            <h3>Data Analysis & Data Retrieval Performance Optimization using Redis</h3>
            <p>A Flask online application that analyzes any data set, imports it into an Azure SQL database, and allows users to query the data using a web interface. Using Redis, I also measured and optimized the application's performance for data retrieval.</p>
          </div>
          <div className="project-item">
            <h3>Search Engine using Azure Cloud Services</h3>
            <p>A Flask Web Application that searches based on words or word combination to find relevant documents that are on azure cloud. The search result identifies a document by name and where in that document that is found. Achieved efficient time complexity.</p>
          </div>
        </section>

        {/* Skills */}
        <section className="portfolio-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Programming Languages</h4>
              <p>Python (Pandas, Matplotlib, PyFlask, Tkinter), JAVA (JSP, Hibernate, SpringBoot)</p>
            </div>
            <div className="skill-category">
              <h4>Web Technologies</h4>
              <p>HTML, CSS, React, JAVASCRIPT, PHP, WordPress, XML</p>
            </div>
            <div className="skill-category">
              <h4>Web Services</h4>
              <p>JSON, APIs</p>
            </div>
            <div className="skill-category">
              <h4>Cloud Technologies</h4>
              <p>AZURE, AWS (Amazon Web Services)</p>
            </div>
            <div className="skill-category">
              <h4>Database Technologies</h4>
              <p>SQL, MySQL, PLSQL, MongoDB</p>
            </div>
            <div className="skill-category">
              <h4>IDE</h4>
              <p>Visual Studio Code, PyCharm, MS Dos, Atom</p>
            </div>
            <div className="skill-category">
              <h4>Operating Systems</h4>
              <p>Windows, Linux, iOS</p>
            </div>
            <div className="skill-category">
              <h4>Version Controllers</h4>
              <p>GIT, GITHUB</p>
            </div>
          </div>
        </section>

        {/* Online Courses */}
        <section className="portfolio-section">
          <h2>Online Courses</h2>
          <div className="course-item">
            <h3>Pro Bootcamp Python – Udemy</h3>
            <p>This course helped me in learning NumPy, Tkinter, SQLite, Plotly etc. and making different projects using these technologies.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-links">
          <a href="#" className="footer-link">Download CV</a>
          <a href="#" className="footer-link">Twitter</a>
          <a href="#" className="footer-link">Github</a>
          <a href="#" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}

export default App; 