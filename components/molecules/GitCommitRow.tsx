
import React from 'react';
import { GitCommit } from '../../types';

interface GitCommitRowProps {
  commit: GitCommit;
  index: number;
  total: number;
  history: GitCommit[];
}

const GitCommitRow: React.FC<GitCommitRowProps> = ({ commit, index, total, history }) => {
  const nodeRadius = 4;
  const laneWidth = 20;
  const rowHeight = 44; // Matches the container height
  const centerX = (commit.lane * laneWidth) + 12;
  const centerY = rowHeight / 2;

  // Find parents to draw connecting lines
  const parentRows = commit.parents.map(pId => history.find(c => c.id === pId)).filter(Boolean) as GitCommit[];

  return (
    <div className="flex items-stretch hover:bg-white/5 transition-colors cursor-pointer group h-[44px]">
      {/* Graph Column */}
      <div className="relative w-12 shrink-0 overflow-visible">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
          {/* Vertical line connecting to previous/next in same lane if it exists */}
          {/* Note: In a real graph we'd calculate paths properly, this is a visual approximation */}
          <line 
            x1={centerX} y1={0} 
            x2={centerX} y2={rowHeight} 
            stroke={commit.color} 
            strokeWidth="1.5" 
            opacity="0.3"
          />
          
          {/* Render lines to parents (upwards in history, but visually below in our list) */}
          {/* Since our list is reversed (newest top), parents are usually further down */}
          {parentRows.map((parent, pIdx) => {
            const parentIndex = history.findIndex(c => c.id === parent.id);
            if (parentIndex > index) {
               // Draw curve to parent
               const parentX = (parent.lane * laneWidth) + 12;
               return (
                 <path
                   key={pIdx}
                   d={`M ${centerX} ${centerY} L ${parentX} ${rowHeight}`}
                   stroke={commit.color}
                   strokeWidth="1.5"
                   fill="none"
                   opacity="0.6"
                 />
               );
            }
            return null;
          })}

          {/* Commit Node */}
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={nodeRadius} 
            fill={commit.color} 
            className="group-hover:r-5 transition-all"
          />
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={nodeRadius + 2} 
            fill="none" 
            stroke={commit.color} 
            strokeWidth="1"
            className="opacity-20"
          />
        </svg>
      </div>

      {/* Commit Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0 pr-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] font-medium truncate group-hover:text-primary transition-colors">
            {commit.message}
          </span>
          <span className="text-[10px] opacity-30 font-mono shrink-0 uppercase">
            {commit.hash}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] opacity-40">
          <span className="truncate">{commit.author}</span>
          <span className="shrink-0">•</span>
          <span className="shrink-0">{commit.date}</span>
        </div>
      </div>
    </div>
  );
};

export default GitCommitRow;
