import { useGradientStore } from "@/stores/gradientStore";
import { GradientState } from "@/types/gradient";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiTrash } from "react-icons/hi";

const MAX_HISTORY = 10;

const DEFAULT_GRADIENT: GradientState = {
  type: "linear",
  angle: 90,
  colorStops: [
    { id: "default-1", color: "#4facfe", position: 0 },
    { id: "default-2", color: "#00f2fe", position: 100 },
  ],
  shape: "circle",
  position: { x: 50, y: 50 },
};

export function GradientHistory() {
  const currentGradient = useGradientStore((state) => state.gradient);
  const setGradient = useGradientStore((state) => state.setGradient);
  const [history, setHistory] = useLocalStorage<GradientState[]>(
    "gradient-history",
    []
  );
  const [mounted, setMounted] = useState(false);
  const isDeleting = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isDeleting.current) return;

    if (history.length === 0) {
      setHistory([currentGradient]);
      return;
    }

    setHistory((prev) => {
      const newHistory = [
        currentGradient,
        ...prev.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(currentGradient)
        ),
      ].slice(0, MAX_HISTORY);
      return newHistory;
    });
  }, [currentGradient, setHistory, mounted, history.length]);

  const deleteHistoryItem = (index: number) => {
    isDeleting.current = true;
    setHistory((prev) => {
      const newHistory = prev.filter((_, i) => i !== index);
      if (newHistory.length === 0) {
        // 不立即添加默认渐变，让 useEffect 处理
        setGradient(DEFAULT_GRADIENT);
      }
      return newHistory;
    });
    setTimeout(() => {
      isDeleting.current = false;
    }, 0);
  };

  const clearHistory = () => {
    isDeleting.current = true;
    setGradient(DEFAULT_GRADIENT);
    setHistory([]);
    setTimeout(() => {
      isDeleting.current = false;
    }, 0);
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-card text-card-foreground rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]"
    >
      {history.length > 0 && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">最近使用</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:text-destructive/90 transition-colors rounded-lg hover:bg-destructive/10"
          >
            <HiTrash className="w-4 h-4" />
            清空历史记录
          </motion.button>
        </div>
      )}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {history.map((gradient, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-video rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden border border-border"
              style={{
                background:
                  gradient.type === "linear"
                    ? `linear-gradient(${
                        gradient.angle
                      }deg, ${gradient.colorStops
                        .map((stop) => `${stop.color} ${stop.position}%`)
                        .join(", ")})`
                    : `radial-gradient(${gradient.shape} at ${
                        gradient.position.x
                      }% ${gradient.position.y}%, ${gradient.colorStops
                        .map((stop) => `${stop.color} ${stop.position}%`)
                        .join(", ")})`,
              }}
              onClick={() => setGradient(gradient)}
            >
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ opacity: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHistoryItem(index);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 transition-colors flex items-center justify-center text-sm font-medium backdrop-blur-sm"
                title="删除"
              >
                ×
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
