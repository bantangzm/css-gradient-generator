import { useGradientStore } from "@/stores/gradientStore";
import presets from "@/data/preset-gradients.json";
import { v4 as uuidv4 } from "uuid";
import { GradientType } from "@/types/gradient";

export function PresetGradients() {
  const setGradient = useGradientStore((state) => state.setGradient);

  const applyPreset = (presetId: string) => {
    const preset = presets.presets.find((p) => p.id === presetId);
    if (!preset) return;

    // 为每个色标添加唯一ID
    const colorStops = preset.colorStops.map((stop) => ({
      ...stop,
      id: uuidv4(),
    }));

    setGradient({
      type: preset.type as GradientType,
      angle: preset.angle,
      colorStops,
      shape: "circle",
      position: { x: 50, y: 50 },
    });
  };

  return (
    <div className="w-full">
      <div className="max-w-full overflow-x-auto pb-4 hide-scrollbar">
        <div className="inline-flex gap-4 px-0.5">
          {presets.presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className="flex-none w-40 h-24 rounded-lg shadow hover:shadow-md transition-shadow"
              style={{
                background: `linear-gradient(${
                  preset.angle
                }deg, ${preset.colorStops
                  .map((stop) => `${stop.color} ${stop.position}%`)
                  .join(", ")})`,
              }}
            >
              <span className="block text-center py-8 text-white font-semibold shadow-text">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
