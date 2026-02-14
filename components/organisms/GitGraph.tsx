
import React from 'react';
import { MOCK_GIT_HISTORY } from '../../constants';
import GitCommitRow from '../molecules/GitCommitRow';

const GitGraph: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 flex justify-between items-center bg-sidebar-dark/50 sticky top-0 z-10">
        <span>Git Graph</span>
        <div className="flex gap-2">
           <span className="material-icons-outlined text-sm cursor-pointer hover:opacity-100 opacity-60">refresh</span>
           <span className="material-icons-outlined text-sm cursor-pointer hover:opacity-100 opacity-60">filter_list</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar py-1">
        {MOCK_GIT_HISTORY.map((commit, idx) => (
          <GitCommitRow 
            key={commit.id} 
            commit={commit} 
            index={idx}
            total={MOCK_GIT_HISTORY.length}
            history={MOCK_GIT_HISTORY}
          />
        ))}
        
        <div className="p-4 text-center">
            <button className="text-[11px] bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded transition-colors font-medium">
                Load More Commits
            </button>
        </div>
      </div>
    </div>
  );
};

export default GitGraph;
