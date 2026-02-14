
import React from 'react';
import { PORTFOLIO_CONFIG } from '../../portfolio.config';

interface IDELayoutProps {
  header: React.ReactNode;
  activityBar: React.ReactNode;
  sidebar?: React.ReactNode;
  editor: React.ReactNode;
  terminal?: React.ReactNode;
  statusBar: React.ReactNode;
}

const IDELayout: React.FC<IDELayoutProps> = ({
  header,
  activityBar,
  sidebar,
  editor,
  terminal,
  statusBar
}) => {
  return (
    <div className="h-screen flex flex-col select-none transition-all duration-300 font-display overflow-hidden" 
         style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
      {header}
      <div className="flex flex-1 overflow-hidden relative">
        {activityBar}
        {sidebar}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {editor}
          {terminal}
        </main>
      </div>
      {statusBar}
    </div>
  );
};

export default IDELayout;
