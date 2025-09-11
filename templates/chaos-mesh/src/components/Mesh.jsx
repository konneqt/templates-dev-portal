import { useColorMode } from '@docusaurus/theme-common';
import { gsap } from 'gsap';
import React, { useLayoutEffect, useRef, useCallback } from 'react';
import { useDidMountEffect } from '../utils/hooks';
import stylesConfig from '../../styles.config.json';

// Grid configuration
const GRID_CONFIG = {
  rows: 12,
  dotsPerRow: 12,
  spacing: 25,
  get dotsNum() { return this.rows * this.dotsPerRow; }
};

// Brand colors
const COLORS = {
  primary: stylesConfig.colors['--primary-color'], 
  secondary: stylesConfig.colors['--secondary-color'], 
  accent: '#00E1FF',
  neutral: {
    light: 'rgba(43, 127, 255, 0.2)',
    dark: 'rgba(0, 119, 255, 0.3)'
  },
  lines: {
    light: 'rgba(43, 127, 255, 0.1)',
    dark: 'rgba(0, 68, 255, 0.15)'
  }
};

// Animation constants
const ANIMATION_CONFIG = {
  duration: 4,
  moveDistance: { x: 8, y: -16 },
  staggerAmount: 1.5,
  rotationLimits: { x: [30, 45], y: [-9, -18] },
  injectionDuration: 2.5,
  injectionScale: 6,
  injectionRepeats: 5,
  waveCount: 15,
  waveDuration: 1.5,
  waveRadius: 15,
  injectionDelay: 1500
};

// Optimized color selection functions
const getRandomDotColor = (theme) => {
  const rand = Math.random();
  if (rand > 0.7) return COLORS.primary;
  if (rand > 0.4) return COLORS.secondary;
  if (rand > 0.2) return COLORS.accent;
  return COLORS.neutral[theme];
};

const getLineColor = (theme) => COLORS.lines[theme];
const getNeutralDotColor = (theme) => COLORS.neutral[theme];

export default function Mesh() {
  const svgEl = useRef(null);
  const pathsGroup = useRef(null);
  const dotsGroup = useRef(null);
  const ptsRef = useRef([]);
  
  // Animation state refs for better performance
  const animationState = useRef({
    scaling: false,
    percent: 0,
    curve1: 5,
    curve2: 0,
    curve2Range: [3, 4, 5],
    injectedDot: 64,
    injectedDots: [64]
  });

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  // Optimized redraw function with reduced DOM queries
  const reDraw = useCallback(() => {
    const pts = ptsRef.current;
    const state = animationState.current;
    let row = 0;

    for (let i = 0; i < pts.length; i++) {
      // Cache DOM property access
      pts[i] = {
        x: gsap.getProperty(`.dot-${i}`, 'x'),
        y: gsap.getProperty(`.dot-${i}`, 'y'),
      };

      if (i % GRID_CONFIG.dotsPerRow === 0) row++;
      if (row >= GRID_CONFIG.rows) continue;

      const pathElement = `.path-${i}`;
      
      // Simplified path generation logic
      if (isCornerDot(i, row)) {
        updateCornerPath(pathElement, pts, i);
      } else {
        updateRegularPath(pathElement, pts, i, row, state);
      }
    }
  }, []);

  // Helper functions for path updates
  const isCornerDot = (i, row) => {
    return (i % GRID_CONFIG.dotsPerRow === 0 && row % 2 === 0) ||
           (i % GRID_CONFIG.dotsPerRow === GRID_CONFIG.dotsPerRow - 1 && row % 2 === 1);
  };

  const updateCornerPath = (pathElement, pts, i) => {
    const d = `M${pts[i].x},${pts[i].y}L${pts[i + GRID_CONFIG.dotsPerRow].x},${pts[i + GRID_CONFIG.dotsPerRow].y}`;
    gsap.set(pathElement, { attr: { d } });
  };

  const updateRegularPath = (pathElement, pts, i, row, state) => {
    const isOddRow = row % 2 === 1;
    const { scaling, percent, curve1, curve2, injectedDot } = state;
    
    if (isOddRow) {
      updateOddRowPath(pathElement, pts, i, scaling, percent, curve1, curve2, injectedDot);
    } else {
      updateEvenRowPath(pathElement, pts, i, scaling, percent, curve1, curve2, injectedDot);
    }
  };

  const updateOddRowPath = (pathElement, pts, i, scaling, percent, curve1, curve2, injectedDot) => {
    const start = `M ${pts[i + GRID_CONFIG.dotsPerRow].x} ${pts[i + GRID_CONFIG.dotsPerRow].y}`;
    let dot = ` L ${pts[i].x} ${pts[i].y}`;
    let end = ` L ${pts[i + GRID_CONFIG.dotsPerRow + 1].x} ${pts[i + GRID_CONFIG.dotsPerRow + 1].y}`;

    if (i === injectedDot && scaling) {
      dot = ` C ${pts[i + GRID_CONFIG.dotsPerRow].x} ${pts[i + GRID_CONFIG.dotsPerRow].y - curve1 * percent}, ${pts[i].x} ${pts[i].y + curve2 * percent}, ${pts[i].x} ${pts[i].y}`;
      end = ` C ${pts[i].x + curve2 * percent} ${pts[i].y}, ${pts[i + GRID_CONFIG.dotsPerRow + 1].x - curve1 * percent} ${pts[i + GRID_CONFIG.dotsPerRow + 1].y}, ${pts[i + GRID_CONFIG.dotsPerRow + 1].x} ${pts[i + GRID_CONFIG.dotsPerRow + 1].y}`;
      
      gsap.set(pathElement, {
        attr: {
          d: start + dot + end,
          'stroke-dasharray': `30 ${Math.min(10 * percent, 200)}`,
        },
      });
    } else {
      gsap.set(pathElement, { attr: { d: start + dot + end } });
    }
  };

  const updateEvenRowPath = (pathElement, pts, i, scaling, percent, curve1, curve2, injectedDot) => {
    const start = `M ${pts[i + GRID_CONFIG.dotsPerRow - 1].x} ${pts[i + GRID_CONFIG.dotsPerRow - 1].y}`;
    let dot = ` L ${pts[i].x} ${pts[i].y}`;
    let end = ` L ${pts[i + GRID_CONFIG.dotsPerRow].x} ${pts[i + GRID_CONFIG.dotsPerRow].y}`;

    const shouldApplySpecialEffect = scaling && (
      i === injectedDot - GRID_CONFIG.dotsPerRow ||
      i === injectedDot - GRID_CONFIG.dotsPerRow + 1 ||
      i === injectedDot + GRID_CONFIG.dotsPerRow ||
      i === injectedDot + GRID_CONFIG.dotsPerRow + 1
    );

    if (shouldApplySpecialEffect) {
      if (i === injectedDot - GRID_CONFIG.dotsPerRow) {
        end = ` C ${pts[i].x + curve1 * percent} ${pts[i].y}, ${pts[i + GRID_CONFIG.dotsPerRow].x - curve2 * percent} ${pts[i + GRID_CONFIG.dotsPerRow].y}, ${pts[i + GRID_CONFIG.dotsPerRow].x} ${pts[i + GRID_CONFIG.dotsPerRow].y}`;
      } else if (i === injectedDot - GRID_CONFIG.dotsPerRow + 1) {
        dot = ` C ${pts[i + GRID_CONFIG.dotsPerRow - 1].x} ${pts[i + GRID_CONFIG.dotsPerRow - 1].y - curve2 * percent}, ${pts[i].x} ${pts[i].y + curve1 * percent}, ${pts[i].x} ${pts[i].y}`;
      }

      gsap.set(pathElement, {
        attr: {
          d: start + dot + end,
          'stroke-dasharray': `30 ${Math.min(10 * percent, 200)}`,
        },
      });
    } else {
      gsap.set(pathElement, { attr: { d: start + dot + end } });
    }
  };

  // Optimized chaos injection with better cleanup
  const injectChaos = useCallback(() => {
    const state = animationState.current;
    if (state.scaling) return;

    state.curve2 = state.curve2Range[Math.floor(Math.random() * state.curve2Range.length)];
    state.injectedDot = state.injectedDots[Math.floor(Math.random() * state.injectedDots.length)];
    state.scaling = true;

    const targetDot = `.dot-${state.injectedDot}`;
    
    const injectedTween = gsap.to(targetDot, {
      duration: ANIMATION_CONFIG.injectionDuration,
      scale: ANIMATION_CONFIG.injectionScale,
      ease: 'back.inOut(2.5)',
      repeat: ANIMATION_CONFIG.injectionRepeats,
      yoyo: true,
      onUpdate: () => {
        state.percent = Math.min(injectedTween.time(), 20);
      },
      onComplete: () => {
        state.scaling = false;
      },
    });

    // Create and animate waves more efficiently
    createWaveAnimation(state.injectedDot);
  }, []);

  const createWaveAnimation = useCallback((dotIndex) => {
    const dotElement = document.querySelector(`.dot-${dotIndex}`);
    const waves = [];
    
    // Create all waves at once
    for (let i = 0; i < ANIMATION_CONFIG.waveCount; i++) {
      const wave = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      gsap.set(wave, {
        attr: {
          class: `wave wave-${i}`,
          r: 0,
          fill: 'none',
          stroke: COLORS.accent,
          'stroke-opacity': 0.4,
          'stroke-width': 0.4,
        },
      });
      dotElement.appendChild(wave);
      waves.push(wave);
    }

    // Animate all waves in parallel for better performance
    const waveTimeline = gsap.timeline({
      onComplete: () => waves.forEach(wave => wave.remove()),
    });

    waves.forEach((_, index) => {
      waveTimeline.to(
        `.wave-${index}`,
        {
          duration: ANIMATION_CONFIG.waveDuration,
          attr: { 
            r: ANIMATION_CONFIG.waveRadius, 
            'stroke-opacity': 0, 
            'stroke-width': 0 
          },
          ease: 'sine.inOut',
        },
        0 // All waves start simultaneously
      );
    });
  }, []);

  useLayoutEffect(() => {
    // Enhanced GSAP performance settings
    gsap.ticker.lagSmoothing(500, 16);
    gsap.ticker.fps(30);

    const el = svgEl.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Initialize grid elements
      initializeGrid();
      
      // Start main animation
      startMeshAnimation();
      
      // Setup mouse interaction with optimized quickTo
      setupMouseInteraction(el);
      
      // Setup chaos injection
      const chaosHandler = () => injectChaos();
      el.addEventListener('click', chaosHandler);
      const chaosTimeout = setTimeout(chaosHandler, ANIMATION_CONFIG.injectionDelay);
      
      // Visibility API integration for performance
      setupVisibilityHandling();

      return () => {
        el.removeEventListener('click', chaosHandler);
        clearTimeout(chaosTimeout);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, el);

    return () => {
      ctx.revert();
      ptsRef.current = [];
      // Reset animation state
      animationState.current = {
        scaling: false,
        percent: 0,
        curve1: 5,
        curve2: 0,
        curve2Range: [3, 4, 5],
        injectedDot: 64,
        injectedDots: [64]
      };
    };
  }, [injectChaos]);

  // Extracted initialization functions for better organization
  const initializeGrid = useCallback(() => {
    let index = 0;
    
    for (let row = 0; row < GRID_CONFIG.rows; row++) {
      for (let dotNum = 0; dotNum < GRID_CONFIG.dotsPerRow; dotNum++) {
        createGridPath(index);
        createGridDot(index, row, dotNum);
        index++;
      }
    }
  }, [isDark]);

  const createGridPath = (index) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    gsap.set(path, {
      attr: {
        class: `path path-${index}`,
        fill: 'none',
        stroke: getLineColor(colorMode),
        'stroke-width': 0.4,
      },
    });
    pathsGroup.current.appendChild(path);
  };

  const createGridDot = (index, row, dotNum) => {
    const dotGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    
    const position = {
      x: (row % 2 ? 0 : GRID_CONFIG.spacing) + dotNum * GRID_CONFIG.spacing * 2,
      y: row * GRID_CONFIG.spacing,
    };

    ptsRef.current.push(position);

    gsap.set(dotGroup, {
      attr: { class: `dot dot-${index}` },
      ...position,
    });

    const color = getRandomDotColor(colorMode);
    gsap.set(dot, {
      attr: {
        class: 'dot-inner',
        r: 1.2,
        fill: color,
        stroke: color,
        'stroke-opacity': 0.6,
        'stroke-width': 1.2,
      },
    });

    dotGroup.appendChild(dot);
    dotsGroup.current.appendChild(dotGroup);
  };

  const startMeshAnimation = () => {
    gsap.to('.dot', {
      duration: ANIMATION_CONFIG.duration,
      x: `+=${ANIMATION_CONFIG.moveDistance.x}`,
      y: `+=${ANIMATION_CONFIG.moveDistance.y}`,
      ease: 'sine.inOut',
      stagger: {
        grid: [GRID_CONFIG.rows, GRID_CONFIG.dotsPerRow],
        amount: ANIMATION_CONFIG.staggerAmount,
        from: 'random',
      },
      repeat: -1,
      yoyo: true,
      onUpdate: reDraw,
    });
  };

  const setupMouseInteraction = (element) => {
    const quickRotX = gsap.quickTo(element, 'rotationX', { duration: 1.5 });
    const quickRotY = gsap.quickTo(element, 'rotationY', { duration: 1.5 });
    
    const handleMouseMove = (e) => {
      const rotationX = Math.max(
        (1 - e.clientY / window.innerHeight) * ANIMATION_CONFIG.rotationLimits.x[1], 
        ANIMATION_CONFIG.rotationLimits.x[0]
      );
      const rotationY = Math.max(
        (1 - e.clientX / window.innerWidth) * ANIMATION_CONFIG.rotationLimits.y[1], 
        ANIMATION_CONFIG.rotationLimits.y[0]
      );
      
      quickRotX(rotationX);
      quickRotY(rotationY);
    };
    
    element.addEventListener('mousemove', handleMouseMove);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      gsap.globalTimeline.pause();
    } else {
      gsap.globalTimeline.resume();
    }
  };

  const setupVisibilityHandling = () => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  };

  // Optimized theme change handler
  useDidMountEffect(() => {
    const neutralColor = getNeutralDotColor(colorMode);
    const lineColor = getLineColor(colorMode);
    
    // Batch DOM updates for better performance
    gsap.set('.path', {
      attr: { stroke: lineColor },
    });

    // Update only neutral dots, preserve accent colors
    for (let i = 0; i < GRID_CONFIG.dotsNum; i++) {
      const currentFill = gsap.getProperty(`.dot-${i} > .dot-inner`, 'fill');
      
      if (![COLORS.primary, COLORS.secondary, COLORS.accent].includes(currentFill)) {
        gsap.set(`.dot-${i} > .dot-inner`, {
          attr: {
            fill: neutralColor,
            stroke: neutralColor,
          },
        });
      }
    }
  }, [colorMode]);

  return (
    <svg
      ref={svgEl}
      style={{
        transform: 'rotate3d(2, -.4, -1, 25deg)',
        width: '100%',
        minWidth: '700px',
        minHeight: '500px',
      }}
      viewBox="0 0 500 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g ref={pathsGroup} />
      <g ref={dotsGroup} />
    </svg>
  );
}