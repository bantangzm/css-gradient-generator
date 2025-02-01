import { ColorStop as ColorStopType } from "@/types/gradient";
import { useGradientStore } from "@/stores/gradientStore";

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
        className="w-12 h-12 rounded cursor-pointer"
      />
      <input
        type="range"
        min="0"
        max="100"
        value={colorStop.position}
        onChange={(e) =>
          updateColorStop(colorStop.id, { position: Number(e.target.value) })
        }
        className="w-full"
      />
      <button
        onClick={() => removeColorStop(colorStop.id)}
        className="p-2 text-red-500"
      >
        删除
      </button>
    </div>
  );
}
