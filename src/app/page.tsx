"use client";

import { ColorStop } from "@/components/ColorStop";
import { PreviewPane } from "@/components/PreviewPane";
import { CodeOutput } from "@/components/CodeOutput";
import { useGradientStore } from "@/stores/gradientStore";
import { GradientControls } from "@/components/GradientControls";
import { PresetGradients } from "@/components/PresetGradients";
import { GradientType } from "@/types/gradient";
import { GradientHistory } from "@/components/GradientHistory";

export default function Home() {
  const gradient = useGradientStore((state) => state.gradient);
  const setType = useGradientStore((state) => state.setType);
  const addColorStop = useGradientStore((state) => state.addColorStop);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">CSS 渐变生成器</h1>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">渐变类型</h2>
          <select
            value={gradient.type}
            onChange={(e) => setType(e.target.value as GradientType)}
            className="p-2 border rounded"
          >
            <option value="linear">线性渐变</option>
            <option value="radial">径向渐变</option>
          </select>
        </div>

        {gradient.type === "linear" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">方向控制</h2>
            <GradientControls />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">颜色控制</h2>
          {gradient.colorStops.map((stop) => (
            <ColorStop key={stop.id} colorStop={stop} />
          ))}
          <button
            onClick={() => addColorStop("#000000")}
            className="px-4 py-2 bg-green-500 text-white rounded"
            disabled={gradient.colorStops.length >= 8}
          >
            添加颜色
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">预设模板</h2>
          <PresetGradients />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">预览</h2>
          <PreviewPane />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">历史记录</h2>
          <GradientHistory />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">生成代码</h2>
          <CodeOutput />
        </div>
      </div>
    </div>
  );
}
