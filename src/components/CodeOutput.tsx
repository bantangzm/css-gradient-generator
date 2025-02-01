import { useGradientStore } from "@/stores/gradientStore";
import { useState } from "react";
import { GradientFormat, GradientState } from "@/types/gradient";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CodeOutput() {
  const gradient = useGradientStore((state) => state.gradient);
  const [format, setFormat] = useState<GradientFormat>("css");

  const generateGradientCSS = (gradient: GradientState) => {
    if (gradient.type === "linear") {
      const stops = gradient.colorStops
        .sort((a, b) => a.position - b.position)
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ");
      return `linear-gradient(${gradient.angle}deg, ${stops})`;
    } else {
      const stops = gradient.colorStops
        .sort((a, b) => a.position - b.position)
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ");
      return `radial-gradient(${gradient.shape} at ${gradient.position.x}% ${gradient.position.y}%, ${stops})`;
    }
  };

  const generateCode = () => {
    const gradientCSS = generateGradientCSS(gradient);

    switch (format) {
      case "css":
        return `background: ${gradientCSS};`;
      case "scss":
        return `$gradient: ${gradientCSS};\n\n.element {\n  background: $gradient;\n}`;
      case "sass":
        return `$gradient: ${gradientCSS}\n\n.element\n  background: $gradient`;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());
      alert("代码已复制到剪贴板！");
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select
          value={format}
          onValueChange={(value) => setFormat(value as GradientFormat)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="选择格式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="scss">SCSS</SelectItem>
            <SelectItem value="sass">SASS</SelectItem>
          </SelectContent>
        </Select>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyToClipboard}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          复制代码
        </motion.button>
      </div>
      <pre className="p-4 bg-gray-800 text-gray-100 rounded-lg overflow-x-auto">
        <code>{generateCode()}</code>
      </pre>
    </div>
  );
}
