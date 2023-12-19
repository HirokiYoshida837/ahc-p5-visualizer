'use client'

import {SketchComponent} from '@/libs/components/sketch-components';
import {NextPage} from 'next';
import p5Types from 'p5'
import {Sketch} from "@p5-wrapper/react";

const canvasSize = {
  x: 500,
  y: 500,
};

let ellipsePosX = 0;
let ellipsePosY = 250;

const Page: NextPage = () => {
  const sketch: Sketch = (p5: p5Types) => {

    p5.setup = () => {
      p5.createCanvas(canvasSize.x, canvasSize.y)
    }

    p5.draw = () => {
      p5.background(0);
      p5.ellipse(ellipsePosX, ellipsePosY, 20, 20);

      ellipsePosX += 5;

      if (ellipsePosX > canvasSize.x) {
        ellipsePosX = 0;
      }
    }
  }

  return (
    <>
      <SketchComponent sketch={sketch}/>
    </>
  );
}

export default Page;
