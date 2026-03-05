import { Tab } from "@/entities/admin/model/types";

interface FilterTabsProps {
    tabs: { id: Tab; label: string; count: number }[];
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

export function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
    return (
        <div className="flex gap-1 border-b sm:border-b-0">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                        activeTab === tab.id
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                >
                    {tab.label}
                    <span
                        className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                            activeTab === tab.id
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                        }`}
                    >
                        {tab.count}
                    </span>
                </button>
            ))}
        </div>
    );
}
