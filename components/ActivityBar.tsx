
import React from 'react';

interface ActivityBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'explorer', icon: 'file_copy', label: 'Explorer' },
    { id: 'search', icon: 'search', label: 'Search' },
    { id: 'git', icon: 'account_tree', label: 'Source Control', badge: 3 },
    { id: 'terminal', icon: 'terminal', label: 'Terminal' },
    { id: 'extensions', icon: 'extension', label: 'Extensions' },
  ];

  const bottomItems = [
    { id: 'account', icon: 'account_circle', label: 'Accounts' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="w-12 bg-activity-bar flex flex-col items-center py-4 gap-6 border-r border-white/5 flex-shrink-0">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`relative cursor-pointer transition-colors group ${
            activeTab === item.id ? 'text-white border-l-2 border-primary pl-1 -ml-1' : 'text-white/40 hover:text-white'
          }`}
          title={item.label}
        >
          <span className="material-icons-outlined text-2xl">{item.icon}</span>
          {item.badge && (
            <span className="absolute -top-1 -right-1 bg-primary text-background-dark text-[9px] font-bold px-1 rounded-full">
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
            className={`relative cursor-pointer transition-colors group ${
              activeTab === item.id ? 'text-white border-l-2 border-primary pl-1 -ml-1' : 'text-white/40 hover:text-white'
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
