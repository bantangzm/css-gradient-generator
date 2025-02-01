import { useGradientStore } from "@/stores/gradientStore";

export function PreviewPane() {
  const gradient = useGradientStore((state) => state.gradient);

  const generateGradientCSS = () => {
    const { type, colorStops, angle, direction, shape, position } = gradient;

    if (type === "linear") {
      const stops = colorStops
        .sort((a, b) => a.position - b.position)
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ");

      const orientation = direction || `${angle}deg`;
      return `linear-gradient(${orientation}, ${stops})`;
    } else {
      const stops = colorStops
        .sort((a, b) => a.position - b.position)
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ");
      return `radial-gradient(${shape} at ${position.x}% ${position.y}%, ${stops})`;
    }
  };

  return (
    <div
      className="w-full h-64 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      style={{ background: generateGradientCSS() }}
    />
  );
}
