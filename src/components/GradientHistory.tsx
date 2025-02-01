import { useGradientStore } from "@/stores/gradientStore";
import { GradientState } from "@/types/gradient";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState, useRef } from "react";

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
    <div className="w-full">
      {history.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={clearHistory}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            清空历史记录
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {history.map((gradient, index) => (
          <div key={index} className="relative group">
            <button
              onClick={() => setGradient(gradient)}
              className="w-full h-24 rounded-lg shadow hover:shadow-md transition-shadow"
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
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteHistoryItem(index);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors flex items-center justify-center text-sm font-medium"
              title="删除"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
