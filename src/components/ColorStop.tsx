import { ColorStop as ColorStopType } from "@/types/gradient";
import { useGradientStore } from "@/stores/gradientStore";
import { Slider } from "@/components/ui/slider";
import { HiTrash } from "react-icons/hi";
import { motion } from "framer-motion";

interface ColorStopProps {
  colorStop: ColorStopType;
}

export function ColorStop({ colorStop }: ColorStopProps) {
  const updateColorStop = useGradientStore((state) => state.updateColorStop);
  const removeColorStop = useGradientStore((state) => state.removeColorStop);

  return (
    <div className="flex items-center gap-4">
      <input
        type="color"
        value={colorStop.color}
        onChange={(e) =>
          updateColorStop(colorStop.id, { color: e.target.value })
        }
        className="w-12 h-12 rounded-lg cursor-pointer border border-border shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] transition-shadow"
      />
      <Slider
        value={[colorStop.position]}
        min={0}
        max={100}
        step={1}
        onValueChange={(value) =>
          updateColorStop(colorStop.id, { position: value[0] })
        }
        className="flex-1"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => removeColorStop(colorStop.id)}
        className="p-2 text-red-500 hover:text-red-600 transition-colors"
      >
        <HiTrash className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
