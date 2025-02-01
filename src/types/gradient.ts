export type GradientType = 'linear' | 'radial';

export interface ColorStop {
  color: string;
  position: number; // 0-100
  id: string;
}

export interface GradientState {
  type: GradientType;
  colorStops: ColorStop[];
  angle: number; // for linear gradient (0-360)
  direction?: string; // 新增预设方向
  shape: 'circle' | 'ellipse'; // for radial gradient
  position: { x: number; y: number }; // for radial gradient center (0-100)
} 