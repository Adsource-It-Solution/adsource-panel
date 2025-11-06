import React from 'react'

export default function NotAuthenticatedPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold mb-2">Not Authenticated</h1>
        <p className="text-gray-400 mb-4">
          You must be logged in with proper access to view this page.
        </p>
        <a
          href="/login"
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200"
        >
          Go to Login
        </a>
      </div>
    );
  }
  
