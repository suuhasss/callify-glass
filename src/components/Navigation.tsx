
import { motion } from "framer-motion";
import { Phone, Clock, Users2, Star } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "recents", icon: Clock, label: "Recents" },
    { id: "contacts", icon: Users2, label: "Contacts" },
    { id: "favorites", icon: Star, label: "Favorites" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10 px-4 py-2">
      <div className="flex justify-around items-center">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center p-2 relative ${
              activeTab === id ? "text-nothing-red" : "text-white/60"
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
            {activeTab === id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 w-12 h-0.5 bg-nothing-red"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
