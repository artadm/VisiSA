import React from 'react'

const MyFooter = () => {
	return (
		<footer className="w-full py-8 mt-12 border-t border-slate-200">
  <div className="flex flex-col items-center justify-center space-y-2">
    <a 
      href="https://github.com/artadm" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors duration-300"
    >
      <span className="text-sm font-medium tracking-tight">
        made by <span className="font-bold text-slate-700 group-hover:text-blue-600">artadm</span>
      </span>
      <div className="h-px w-8 bg-slate-400 group-hover:bg-blue-600 transition-all duration-300" />
      <span className="text-xs font-mono text-slate-400">github.com/artadm</span>
    </a>
    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
      ODTÜ Statistics • AI Visualizer v1.0
    </p>
  </div>
</footer>
	)
}

export default MyFooter