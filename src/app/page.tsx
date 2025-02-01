"use client";

import { ColorStop } from "@/components/ColorStop";
import { PreviewPane } from "@/components/PreviewPane";
import { CodeOutput } from "@/components/CodeOutput";
import { useGradientStore } from "@/stores/gradientStore";
import { GradientControls } from "@/components/GradientControls";
import { PresetGradients } from "@/components/PresetGradients";
import { GradientType } from "@/types/gradient";
import { GradientHistory } from "@/components/GradientHistory";
import { motion } from "framer-motion";
import { HiColorSwatch, HiTemplate } from "react-icons/hi";
import { ModeToggle } from "@/components/ModeToggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  const gradient = useGradientStore((state) => state.gradient);
  const setType = useGradientStore((state) => state.setType);
  const addColorStop = useGradientStore((state) => state.addColorStop);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          >
            CSS 渐变生成器
          </motion.h1>
          <ModeToggle />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* 预览和代码输出区域 */}
          <motion.div variants={item} className="lg:col-span-12 space-y-6">
            <PreviewPane />
            <CodeOutput />
          </motion.div>

          {/* 控制面板 */}
          <motion.div variants={item} className="lg:col-span-6 space-y-6">
            <div className="bg-card text-card-foreground rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.4)] space-y-6">
              <div className="flex items-center gap-2">
                <HiColorSwatch className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  渐变类型
                </h2>
              </div>
              <Select
                value={gradient.type}
                onValueChange={(value) => setType(value as GradientType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择渐变类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">线性渐变</SelectItem>
                  <SelectItem value="radial">径向渐变</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {gradient.type === "linear" && (
              <motion.div
                variants={item}
                className="bg-card text-card-foreground rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]"
              >
                <GradientControls />
              </motion.div>
            )}

            <motion.div
              variants={item}
              className="bg-card text-card-foreground rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.4)] space-y-6"
            >
              <div className="flex items-center gap-2">
                <HiColorSwatch className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  颜色控制
                </h2>
              </div>
              <div className="space-y-4">
                {gradient.colorStops.map((stop) => (
                  <ColorStop key={stop.id} colorStop={stop} />
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addColorStop("#000000")}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  disabled={gradient.colorStops.length >= 8}
                >
                  添加颜色
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* 预设和历史记录 */}
          <motion.div variants={item} className="lg:col-span-6 space-y-6">
            <motion.div
              variants={item}
              className="bg-card text-card-foreground rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.4)] space-y-6"
            >
              <div className="flex items-center gap-2">
                <HiTemplate className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  预设模板
                </h2>
              </div>
              <PresetGradients />
            </motion.div>
            <GradientHistory />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
