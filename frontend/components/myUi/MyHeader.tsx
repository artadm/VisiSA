import React from 'react'

const MyHeader = () => {
	return (
		<header className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900">
          Visi<span className="text-blue-600">SA</span> AI
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Automated Statistical Analysis & Neural Regression Engine prototype. Upload your dataset, select variables, and let the AI uncover insights and relationships in seconds.
        </p>
      </header>
	)
}

export default MyHeader