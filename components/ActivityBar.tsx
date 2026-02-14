
import React from 'react';
import { ActivityTab } from '../types';

interface ActivityBarProps {
  activeTab: ActivityTab;
  setActiveTab: (tab: ActivityTab) => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activeTab, setActiveTab }) => {
  const items: { id: ActivityTab; icon: string; label: string; badge?: number }[] = [
    { id: 'explorer', icon: 'file_copy', label: 'Explorer' },
    { id: 'search', icon: 'search', label: 'Search' },
    { id: 'git', icon: 'account_tree', label: 'Source Control', badge: 3 },
    { id: 'terminal', icon: 'terminal', label: 'Terminal' },
  ];

  const bottomItems: { id: ActivityTab; icon: string; label: string }[] = [
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="w-12 bg-activity-bar flex flex-col items-center py-4 gap-6 border-r border-black/10 dark:border-white/5 flex-shrink-0">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`relative cursor-pointer transition-all group ${
            activeTab === item.id ? 'text-white border-l-2 border-primary pl-1 -ml-1' : 'opacity-40 hover:opacity-100'
          }`}
          title={item.label}
        >
          <span className="material-icons-outlined text-2xl">{item.icon}</span>
          {item.badge && (
            <span className="absolute -top-1 -right-1 bg-primary text-background-dark text-[9px] font-bold px-1 rounded-full border border-black/10">
              {item.badge}
            </span>
          )}
        </div>
      ))}

      <div className="mt-auto flex flex-col gap-6">
        {bottomItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`cursor-pointer transition-all ${
              activeTab === item.id ? 'text-white border-l-2 border-primary pl-1 -ml-1' : 'opacity-40 hover:opacity-100'
            }`}
            title={item.label}
          >
            <span className="material-icons-outlined text-2xl">{item.icon}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ActivityBar;
