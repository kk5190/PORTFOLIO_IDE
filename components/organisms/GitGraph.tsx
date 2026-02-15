
import React, { useState, useMemo } from 'react';
import { MOCK_GIT_HISTORY } from '../../constants';
import GitCommitRow from '../molecules/GitCommitRow';
import Icon from '../atoms/Icon';

interface GitGraphProps {
  currentBranch: string;
  onBranchChange: (branch: string) => void;
}

const GitGraph: React.FC<GitGraphProps> = ({ currentBranch, onBranchChange }) => {
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [branchSearch, setBranchSearch] = useState('');
  
  const branches = ['main', 'feature/atomic-design', 'hotfix/theme-flicker', 'release/v1.5.0', 'develop', 'gh-pages'];

  const filteredBranches = useMemo(() => 
    branches.filter(b => b.toLowerCase().includes(branchSearch.toLowerCase())),
    [branchSearch, branches]
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-sidebar-dark">
      <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 flex justify-between items-center bg-sidebar-dark/80 sticky top-0 z-10">
        <span>Source Control</span>
        <div className="flex gap-2">
           <Icon name="refresh" className="text-sm cursor-pointer hover:opacity-100 opacity-60" />
           <Icon name="more_horiz" className="text-sm cursor-pointer hover:opacity-100 opacity-60" />
        </div>
      </div>

      {/* Source Control Main View */}
      <div className="flex flex-col border-b border-theme/10 pb-4 pt-1">
        {/* Branch Selector Header */}
        <div className="px-3">
          <div className="relative">
            <button 
              onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
              className="w-full flex items-center justify-between px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[11px] transition-colors group border border-transparent hover:border-theme/30"
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <Icon name="account_tree" className="text-xs opacity-60 group-hover:opacity-100" />
                <span className="truncate font-medium">{currentBranch}</span>
              </div>
              <Icon name={isBranchDropdownOpen ? "expand_less" : "expand_more"} className="text-xs opacity-40" />
            </button>

            {isBranchDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-sidebar-dark border border-theme shadow-2xl rounded z-50 py-1 animate-in fade-in slide-in-from-top-1">
                <div className="p-2">
                  <input 
                    type="text"
                    autoFocus
                    placeholder="Search branches..."
                    className="w-full bg-black/30 border border-theme/20 rounded px-2 py-1 text-[11px] outline-none focus:border-primary/50"
                    value={branchSearch}
                    onChange={(e) => setBranchSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="max-h-48 overflow-y-auto custom-scrollbar">
                  {filteredBranches.map(branch => (
                    <div
                      key={branch}
                      onClick={() => {
                        onBranchChange(branch);
                        setIsBranchDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-1.5 text-[11px] cursor-pointer hover:bg-primary/20 transition-colors ${
                        currentBranch === branch ? 'text-primary font-bold bg-primary/5' : 'opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name="account_tree" className="text-[12px]" />
                        <span>{branch}</span>
                      </div>
                      {currentBranch === branch && <Icon name="check" className="text-[12px]" />}
                    </div>
                  ))}
                  {filteredBranches.length === 0 && (
                    <div className="p-3 text-[10px] opacity-30 text-center italic">No branches match your search</div>
                  )}
                </div>
                <div className="border-t border-theme/10 mt-1 pt-1">
                   <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] opacity-60 hover:opacity-100 hover:bg-white/5 cursor-pointer">
                      <Icon name="add" className="text-[14px]" />
                      <span>Create new branch...</span>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="p-3 text-[10px] font-bold uppercase tracking-widest opacity-30 bg-black/10">Commit History</div>
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
            <button className="text-[11px] bg-white/5 hover:bg-white/10 opacity-60 hover:opacity-100 px-3 py-1 rounded transition-colors font-medium">
                Load More History
            </button>
        </div>
      </div>
    </div>
  );
};

export default GitGraph;
