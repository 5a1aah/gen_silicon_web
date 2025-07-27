import React, { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/ai_chip.png'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check for admin mode via URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('admin') === 'true') {
      setShowAdmin(true)
      loadSubmissions()
    }
  }, [])

  const loadSubmissions = async () => {
    try {
      const adminKey = prompt('Enter admin key:')
      if (!adminKey) return
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/contacts`, {
        headers: {
          'X-Admin-Key': adminKey
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      } else {
        alert('Failed to load submissions. Check your admin key.')
      }
    } catch (error) {
      console.error('Error loading submissions:', error)
      alert('Error loading submissions. Please try again.')
    }
  }

  const toggleAdmin = () => {
    setShowAdmin(!showAdmin)
    if (!showAdmin) {
      loadSubmissions()
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent successfully.')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        const errorData = await response.json()
        setSubmitMessage(errorData.error || 'Sorry, there was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="App">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <div className="logo">
            <span className="logo-text">Generative Silicon</span>
          </div>
          <ul className="nav-links">
            <li><button onClick={() => scrollToSection('home')}>Home</button></li>
            <li><button onClick={() => scrollToSection('services')}>Services</button></li>
            <li><button onClick={() => scrollToSection('solutions')}>Solutions</button></li>
            <li><button onClick={() => scrollToSection('about')}>About</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in-left">

            Accelerating ASIC Design with
            <span className="gradient-text"> Generative AI</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-left delay-200">
            Revolutionary automation flows that reduce verification time by 60-70% 
            and total project time by 25% from RTL to GDS (and continuously improving)
          </p>
          <div className="hero-buttons animate-fade-in-left delay-400">
            <button className="btn-primary" onClick={() => scrollToSection('contact')}>Get Started</button>
            <button className="btn-secondary" onClick={() => scrollToSection('services')}>Learn More</button>
          </div>
          <div className="hero-stats animate-fade-in-up delay-600">
            <div className="hero-stat animate-fade-in-up delay-700">
              <span className="hero-stat-number">60-70%</span>
              <span className="hero-stat-label">Verification Time Reduction</span>
            </div>
            <div className="hero-stat animate-fade-in-up delay-800">
              <span className="hero-stat-number">25%</span>
              <span className="hero-stat-label">Project Acceleration</span>
            </div>
            <div className="hero-stat animate-fade-in-up delay-900">
              <span className="hero-stat-number">AI-Powered</span>
              <span className="hero-stat-label">Automation</span>
            </div>
          </div>
        </div>
        <div className="hero-visual animate-fade-in-right delay-300">
          <div className="circuit-animation">
            <div className="chip-icon animate-float">
              <img src={logo} alt="Generative Silicon Logo" className="chip-logo animate-glow" />
            </div>
            <div className="ai-nodes"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Our Services</h2>
          <div className="services-grid">
            <div className="service-card animate-fade-in-up delay-100">
              <div className="service-icon asic-icon"></div>
              <h3>ASIC Design</h3>
              <p>Complete ASIC design solutions from concept to silicon with AI-powered optimization</p>
            </div>
            <div className="service-card animate-fade-in-up delay-200">
              <div className="service-icon verification-icon"></div>
              <h3>Verification</h3>
              <p>Automated verification plan generation and test case creation using generative AI</p>
            </div>
            <div className="service-card animate-fade-in-up delay-300">
              <div className="service-icon dft-icon"></div>
              <h3>DFT Services</h3>
              <p>Design for Test implementation with intelligent automation flows</p>
            </div>
            <div className="service-card animate-fade-in-up delay-400">
              <div className="service-icon physical-icon"></div>
              <h3>Physical Design</h3>
              <p>Advanced physical design and implementation with AI-driven optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="solutions">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">AI-Powered Solutions</h2>
          <div className="solutions-content">
            <div className="solution-highlight animate-fade-in-left delay-100">
              <h3>Verification Automation</h3>
              <div className="stats">
                <div className="stat animate-fade-in-up delay-200">
                  <span className="stat-number">60-70%</span>
                  <span className="stat-label">Verification Flow Reduction</span>
                </div>
                <div className="stat animate-fade-in-up delay-300">
                  <span className="stat-number">25%</span>
                  <span className="stat-label">Total Project Time Saved</span>
                </div>
              </div>
              <p>Our ready solution automates the generation of verification plans and test cases, 
                 dramatically reducing the most time-consuming part of the verification process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">About Generative Silicon</h2>
          <p className="about-text animate-fade-in-up delay-200">
            We are a cutting-edge startup revolutionizing the semiconductor industry through 
            the power of generative AI. Our mission is to accelerate time-to-market and 
            enhance quality in ASIC design through intelligent automation flows.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Get In Touch</h2>
          <p className="animate-fade-in-up delay-200">Ready to accelerate your ASIC design process?</p>
          <div className="contact-content">
            <div className="contact-info animate-fade-in-left delay-300">
              <div className="contact-item">
                <h4>Email</h4>
                <p>salah.eddine.seecs@gmail.com</p>
              </div>
              <div className="contact-item">
                <h4>Phone</h4>
                <p>+212 6 20 41 03 17</p>
              </div>
              <div className="contact-item">
                <h4>Location</h4>
                <p>Barcelona, Spain</p>
              </div>
            </div>
            <div className="contact-form animate-fade-in-right delay-400">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="company"
                    placeholder="Company" 
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Tell us about your project" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button 
                    type="submit" 
                    className={`btn-primary ${isSubmitting ? 'animate-pulse' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Panel */}
      {showAdmin && (
        <section className="admin-panel">
          <div className="container">
            <div className="admin-header">
              <h2>Contact Form Submissions</h2>
              <button onClick={toggleAdmin} className="btn-secondary">Hide Admin</button>
            </div>
            <div className="submissions-list">
              {submissions.length === 0 ? (
                <p>No submissions yet.</p>
              ) : (
                submissions.map((submission) => (
                  <div key={submission._id} className="submission-card">
                    <div className="submission-header">
                      <h4>{submission.name}</h4>
                      <span className="submission-date">
                        {new Date(submission.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="submission-details">
                      <p><strong>Email:</strong> {submission.email}</p>
                      {submission.company && <p><strong>Company:</strong> {submission.company}</p>}
                      <p><strong>Message:</strong></p>
                      <div className="submission-message">{submission.message}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer animate-slide-in-bottom">
        <div className="container">
          <p 
            onClick={(e) => {
              if (e.detail === 3) { // Triple click
                toggleAdmin()
              }
            }}
            style={{ cursor: 'default' }}
            className="animate-fade-in-up delay-100"
          >
            &copy; 2025 Generative Silicon. All rights reserved.
          </p>
          {!showAdmin && (
            <p className="admin-hint animate-fade-in-up delay-200">
            </p>
          )}
        </div>
      </footer>
    </div>
  )
}

export default App
