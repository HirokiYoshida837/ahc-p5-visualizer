'use client'

import {ParsedInput, ParsedOutput} from "@/app/ahc020/_components/type";
import {SketchComponent} from "@/libs/components/sketch-components";
import p5Types from "p5";


type Props = {
  input: ParsedInput,
  output: ParsedOutput,
}

const width = 1000;

export const Visualizer: React.FC<Props> = ({input, output}) => {

  const setUp = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, width).parent(canvasParentRef);
    p5.background(100);

    p5.frameRate(1)

  };

  const draw = (p5: p5Types) => {
    p5.background(100);

    p5.push()
    {
      // 原点の位置を左上から画面の中心に移動（座標変換）
      // refs : https://editor.p5js.org/kaori/sketches/vIouZBVJ
      p5.translate(width / 2, width / 2)
      // スケール変換
      p5.scale(1 / 20)
      p5.scale(1, -1)

      // 基地局を描画
      for (let i = 0; i < input.N; i++) {
        const {X, Y} = input.XYList[i]
        // これだと、左下の角がX,Yの座標になるので描画時にすこしずれる。
        p5.square(X, Y, 200)

        p5.push()
        {
          const color = p5.color('#0151A9');
          color.setAlpha(0.15 * 255)
          p5.fill(color)

          // TODO : scale処理がバグってるのであとで直す
          const r = output.PList[i];
          p5.ellipse(X, Y, r)
        }
        p5.pop()


      }


      // // 住民を描画
      // for (const item of input.ABList) {
      //   p5.ellipse(item.A, item.B, 100)
      // }
      //
      // // 通信ケーブルを描画
      // p5.push()
      // p5.stroke(120)
      // p5.strokeWeight(100)
      // for (const item of input.UVWList) {
      //   const u = input.XYList[item.U - 1]
      //   const v = input.XYList[item.V - 1]
      //   p5.line(u.X, u.Y, v.X, v.Y)
      // }
      // p5.pop()
    }
    p5.pop()

  };

  return (
    <>
      <>
        N: {input.N},
        M: {input.M},
        K: {input.K},
      </>

      <>
        <SketchComponent setup={setUp} draw={draw}/>
      </>

    </>
  )
}


