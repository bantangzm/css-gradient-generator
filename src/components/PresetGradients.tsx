import { useGradientStore } from "@/stores/gradientStore";
import { motion } from "framer-motion";
import { GradientState } from "@/types/gradient";
import presetData from "@/data/preset-gradients.json";

type PresetGradient = {
  id: string;
  name: string;
  type: "linear" | "radial";
  angle: number;
  colorStops: Array<{
    color: string;
    position: number;
  }>;
};

export function PresetGradients() {
  const setGradient = useGradientStore((state) => state.setGradient);

  const handlePresetClick = (preset: PresetGradient) => {
    const gradientState: GradientState = {
      type: preset.type,
      angle: preset.angle,
      colorStops: preset.colorStops.map((stop, index) => ({
        id: `${preset.id}-${index}`,
        color: stop.color,
        position: stop.position,
      })),
      shape: "circle",
      position: { x: 50, y: 50 },
    };
    setGradient(gradientState);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {presetData.presets.map((preset) => (
        <motion.div
          key={preset.id}
          className="relative group"
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.button
            onClick={() => handlePresetClick(preset as PresetGradient)}
            className="w-full h-20 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            style={{
              background:
                preset.type === "linear"
                  ? `linear-gradient(${preset.angle}deg, ${preset.colorStops
                      .map((stop) => `${stop.color} ${stop.position}%`)
                      .join(", ")})`
                  : `radial-gradient(circle at 50% 50%, ${preset.colorStops
                      .map((stop) => `${stop.color} ${stop.position}%`)
                      .join(", ")})`,
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-2 bg-black/50 text-white text-xs font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity">
            {preset.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
