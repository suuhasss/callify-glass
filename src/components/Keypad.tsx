
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface KeypadProps {
  onDigitPress: (digit: string) => void;
  onCall: () => void;
}

export const Keypad = ({ onDigitPress, onCall }: KeypadProps) => {
  const digits = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-black/40 backdrop-blur-xl rounded-t-3xl p-6 w-full max-w-md mx-auto"
    >
      <div className="grid grid-cols-3 gap-4">
        {digits.map((row, rowIndex) =>
          row.map((digit) => (
            <motion.button
              key={digit}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDigitPress(digit)}
              className="h-16 w-16 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center text-2xl text-white/90 font-light hover:bg-white/10 transition-colors"
            >
              {digit}
            </motion.button>
          ))
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onCall}
          className="h-16 w-16 rounded-full bg-nothing-red flex items-center justify-center"
        >
          <Phone className="text-white" size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};
