import { useGradientStore } from "@/stores/gradientStore";

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
          <input
            type="range"
            min="0"
            max="360"
            value={gradient.angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="flex-1"
          />
          <input
            type="number"
            min="0"
            max="360"
            value={gradient.angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded"
          />
          <span className="text-sm">度</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">预设方向</label>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_DIRECTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setDirection(value)}
              className="p-2 border rounded hover:bg-gray-100 text-lg"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
