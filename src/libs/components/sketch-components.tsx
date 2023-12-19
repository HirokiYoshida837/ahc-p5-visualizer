'use client'

import {NextReactP5Wrapper} from '@p5-wrapper/next';
import React from "react";
import {P5WrapperPropsWithSketch} from "@p5-wrapper/react/dist/component/contracts/P5WrapperPropsWithSketch";

export const SketchComponent: React.FC<P5WrapperPropsWithSketch> = (props: P5WrapperPropsWithSketch) => {

  return (
    <NextReactP5Wrapper sketch={props.sketch}/>
  )
}
