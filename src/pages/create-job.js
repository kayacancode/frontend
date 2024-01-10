import React, { useState } from 'react';

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [aiGeneratedProject, setAiGeneratedProject] = useState(''); // State to store AI-generated project idea

  const handleSubmit = async (event) => {
    event.preventDefault();

    const skillsArray = skillsRequired.split(',').map(skill => skill.trim()); // Convert skills to an array

    try {
      const response = await fetch('http://localhost:3000/job-posts', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, 
          description, 
          skillsRequired: skillsArray, 
          companyName
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAiGeneratedProject(result.projectIdea); // Store the AI-generated project idea
    } catch (error) {
      console.error('Failed to create job:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Job Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter job title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
            placeholder="Enter job description"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills Required</label>
          <input 
            type="text" 
            value={skillsRequired} 
            onChange={(e) => setSkillsRequired(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="e.g., JavaScript, Python"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input 
            type="text" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter company name"
          />
        </div>
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Job
        </button>
      </form>

      {aiGeneratedProject && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold">AI-Generated Project Idea:</h2>
          <p>{aiGeneratedProject}</p>
        </div>
      )}
    </div>
  );
};

export default CreateJob;
