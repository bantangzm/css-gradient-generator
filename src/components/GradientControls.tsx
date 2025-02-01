import { useGradientStore } from "@/stores/gradientStore";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

const PRESET_DIRECTIONS = [
  { label: "↑", value: "to top" },
  { label: "↗", value: "to top right" },
  { label: "→", value: "to right" },
  { label: "↘", value: "to bottom right" },
  { label: "↓", value: "to bottom" },
  { label: "↙", value: "to bottom left" },
  { label: "←", value: "to left" },
  { label: "↖", value: "to top left" },
];

export function GradientControls() {
  const gradient = useGradientStore((state) => state.gradient);
  const setAngle = useGradientStore((state) => state.setAngle);
  const setDirection = useGradientStore((state) => state.setDirection);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">角度控制</label>
        <div className="flex items-center gap-4">
          <Slider
            value={[gradient.angle]}
            min={0}
            max={360}
            step={1}
            onValueChange={(value) => setAngle(value[0])}
            className="flex-1"
          />
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={0}
              max={360}
              value={gradient.angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
            <span className="text-sm text-gray-600">度</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">预设方向</label>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_DIRECTIONS.map(({ label, value }) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDirection(value)}
              className="p-2 border rounded-lg hover:bg-gray-50 text-lg transition-colors"
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
