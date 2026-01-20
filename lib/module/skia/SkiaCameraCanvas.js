"use strict";

import React, { useCallback, useState } from 'react';
import { ReanimatedProxy } from "../dependencies/ReanimatedProxy.js";
import { SkiaProxy } from "../dependencies/SkiaProxy.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function SkiaCameraCanvasImpl({
  offscreenTextures,
  resizeMode = 'cover',
  children,
  ...props
}) {
  const texture = ReanimatedProxy.useSharedValue(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  ReanimatedProxy.useFrameCallback(() => {
    'worklet';

    // 1. atomically pop() the latest rendered frame/texture from our queue
    const latestTexture = offscreenTextures.value.pop();
    if (latestTexture == null) {
      // we don't have a new Frame from the Camera yet, skip this render.
      return;
    }

    // 2. dispose the last rendered frame
    texture.value?.dispose();

    // 3. set a new one which will be rendered then
    texture.value = latestTexture;
  });
  const onLayout = useCallback(({
    nativeEvent: {
      layout
    }
  }) => {
    setWidth(Math.round(layout.width));
    setHeight(Math.round(layout.height));
  }, []);
  return /*#__PURE__*/_jsxs(SkiaProxy.Canvas, {
    ...props,
    onLayout: onLayout,
    pointerEvents: "none",
    children: [children, /*#__PURE__*/_jsx(SkiaProxy.Image, {
      x: 0,
      y: 0,
      width: width,
      height: height,
      fit: resizeMode,
      image: texture
    })]
  });
}
export const SkiaCameraCanvas = /*#__PURE__*/React.memo(SkiaCameraCanvasImpl);
//# sourceMappingURL=SkiaCameraCanvas.js.map