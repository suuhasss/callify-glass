import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Keypad } from "@/components/Keypad";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Clock, Users2, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("recents");
  const [showKeypad, setShowKeypad] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const handleDigitPress = (digit: string) => {
    setPhoneNumber(prev => prev + digit);
  };

  const handleCall = () => {
    if (!phoneNumber) {
      toast({
        title: "Enter a phone number",
        description: "Please enter a phone number to make a call",
      });
      return;
    }
    
    toast({
      title: "Calling...",
      description: phoneNumber,
    });
  };

  return (
    <div className="min-h-screen bg-nothing-dark text-white relative overflow-hidden">
      <div className="h-screen pb-20">
        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-light capitalize">{activeTab}</h1>
            {phoneNumber && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl text-nothing-red font-mono"
              >
                {phoneNumber}
              </motion.p>
            )}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === "recents" && (
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <Clock size={48} className="text-nothing-white/20 mb-4" />
                <p className="text-nothing-white/60">No recent calls</p>
              </div>
            )}
            {activeTab === "contacts" && (
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <Users2 size={48} className="text-nothing-white/20 mb-4" />
                <p className="text-nothing-white/60">No contacts found</p>
              </div>
            )}
            {activeTab === "favorites" && (
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <Star size={48} className="text-nothing-white/20 mb-4" />
                <p className="text-nothing-white/60">No favorites yet</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Floating Keypad Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowKeypad(!showKeypad)}
          className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-nothing-red flex items-center justify-center shadow-lg z-10"
        >
          <Phone className="text-white" size={24} />
        </motion.button>

        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Keypad */}
        <AnimatePresence>
          {showKeypad && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-20"
            >
              <Keypad onDigitPress={handleDigitPress} onCall={handleCall} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
