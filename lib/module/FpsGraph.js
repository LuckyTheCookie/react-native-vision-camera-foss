"use strict";

import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MAX_BARS = 30;
const WIDTH = 100;
const HEIGHT = 65;
const BAR_WIDTH = WIDTH / MAX_BARS;
export function FpsGraph({
  averageFpsSamples,
  targetMaxFps,
  style,
  ...props
}) {
  const maxFps = useMemo(() => {
    const currentMaxFps = averageFpsSamples.reduce((prev, curr) => Math.max(prev, curr), 0);
    return Math.max(currentMaxFps, targetMaxFps);
  }, [averageFpsSamples, targetMaxFps]);
  const latestFps = averageFpsSamples[averageFpsSamples.length - 1];
  return /*#__PURE__*/_jsxs(View, {
    ...props,
    style: [styles.container, style],
    children: [averageFpsSamples.map((fps, index) => {
      let height = fps / maxFps * HEIGHT;
      if (Number.isNaN(height) || height < 0) {
        // clamp to 0 if needed
        height = 0;
      }
      return /*#__PURE__*/_jsx(View, {
        style: [styles.bar, {
          height: height
        }]
      }, index);
    }), latestFps != null && !Number.isNaN(latestFps) && /*#__PURE__*/_jsx(View, {
      style: styles.centerContainer,
      children: /*#__PURE__*/_jsxs(Text, {
        style: styles.text,
        children: [Math.round(latestFps), " FPS"]
      })
    })]
  });
}
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 5,
    overflow: 'hidden'
  },
  bar: {
    width: BAR_WIDTH,
    height: 5,
    backgroundColor: 'rgb(243, 74, 77)'
  },
  centerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgb(255, 255, 255)'
  }
});
//# sourceMappingURL=FpsGraph.js.map