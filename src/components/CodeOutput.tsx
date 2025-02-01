import { useGradientStore } from "@/stores/gradientStore";
import { useState } from "react";
import { GradientState } from "@/types/gradient";

export function CodeOutput() {
  const gradient = useGradientStore((state) => state.gradient);
  const [format, setFormat] = useState<"css" | "scss" | "sass">("css");

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
      <div className="flex gap-4">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as any)}
          className="p-2 border rounded"
        >
          <option value="css">CSS</option>
          <option value="scss">SCSS</option>
          <option value="sass">SASS</option>
        </select>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          复制代码
        </button>
      </div>
      <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
        <code>{generateCode()}</code>
      </pre>
    </div>
  );
}
