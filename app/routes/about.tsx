import React from 'react'

function About() {
  return (
    <section className='about p-34'>
      <div className='max-w-7xl mx-auto text-center'>
        <h1 className='text-3xl font-bold mb-4'>About Us</h1>
        <p className='text-lg mb-4'>
          We are <strong>Oliver</strong> and <strong>Juan</strong>, creating a web application based on the
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500"> TMDb API</a>.
          We have used modern technologies such as <strong>React Router</strong>, <strong>Typescript</strong>, and <strong>Vite</strong> to build this project.
        </p>
        <div className='flex justify-center space-x-4'>
          <a href="" target="_blank" rel="noopener noreferrer" className="text-blue-500">Oliver GitHub</a>
          <a href="" target="_blank" rel="noopener noreferrer" className="text-blue-500">Oliver LinkedIn</a>
        </div>
        <div className='flex justify-center space-x-4 mt-4'>
          <a href="" target="_blank" rel="noopener noreferrer" className="text-blue-500">Juan GitHub</a>
          <a href="" target="_blank" rel="noopener noreferrer" className="text-blue-500">JuanLinkedIn</a>
        </div>
      </div>
    </section>
  )
}

export default About
