import { create } from 'zustand';
import { GradientState, ColorStop } from '@/types/gradient';
import { v4 as uuidv4 } from 'uuid';

const initialState: GradientState = {
  type: 'linear',
  colorStops: [
    { id: uuidv4(), color: '#ff0000', position: 0 },
    { id: uuidv4(), color: '#0000ff', position: 100 },
  ],
  angle: 90,
  shape: 'circle',
  position: { x: 50, y: 50 },
};

export const useGradientStore = create<{
  gradient: GradientState;
  setType: (type: GradientState['type']) => void;
  addColorStop: (color: string) => void;
  removeColorStop: (id: string) => void;
  updateColorStop: (id: string, updates: Partial<ColorStop>) => void;
  setAngle: (angle: number) => void;
  setDirection: (direction: string) => void;
  setShape: (shape: GradientState['shape']) => void;
  setPosition: (position: GradientState['position']) => void;
  setGradient: (gradient: GradientState) => void;
}>((set) => ({
  gradient: initialState,
  setGradient: (gradient) => set({ gradient }),
  setType: (type) => set((state) => ({ gradient: { ...state.gradient, type } })),
  addColorStop: (color) =>
    set((state) => ({
      gradient: {
        ...state.gradient,
        colorStops: [
          ...state.gradient.colorStops,
          { id: uuidv4(), color, position: 50 },
        ],
      },
    })),
  removeColorStop: (id) =>
    set((state) => ({
      gradient: {
        ...state.gradient,
        colorStops: state.gradient.colorStops.filter((stop) => stop.id !== id),
      },
    })),
  updateColorStop: (id, updates) =>
    set((state) => ({
      gradient: {
        ...state.gradient,
        colorStops: state.gradient.colorStops.map((stop) =>
          stop.id === id ? { ...stop, ...updates } : stop
        ),
      },
    })),
  setAngle: (angle) =>
    set((state) => ({
      gradient: {
        ...state.gradient,
        angle,
        direction: undefined,
      },
    })),
  setDirection: (direction) =>
    set((state) => ({
      gradient: {
        ...state.gradient,
        direction,
      },
    })),
  setShape: (shape) =>
    set((state) => ({ gradient: { ...state.gradient, shape } })),
  setPosition: (position) =>
    set((state) => ({ gradient: { ...state.gradient, position } })),
})); 