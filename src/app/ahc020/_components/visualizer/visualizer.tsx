'use client'

import {ParsedInput, ParsedOutput} from "@/app/ahc020/_components/type";
import {SketchComponent} from "@/libs/components/sketch-components";
import p5Types from "p5";
import {OutputUtil} from "@/app/ahc020/_components/logic/output-util";


type Props = {
  input: ParsedInput,
  output: ParsedOutput,
}

const width = 1000;


export const Visualizer: React.FC<Props> = ({input, output}: Props) => {

  const setUp = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, width).parent(canvasParentRef);

    p5.background(100);
    p5.frameRate(1)
  };


  const draw = (p5: p5Types) => {
    p5.background(200);

    p5.push()
    {
      // 原点の位置を左上から画面の中心に移動（座標変換）
      // refs : https://editor.p5js.org/kaori/sketches/vIouZBVJ
      p5.translate(width / 2, width / 2)
      // スケール変換
      p5.scale(1 / 20)
      p5.scale(1, -1)

      p5.rectMode('radius')

      // 基地局を描画
      for (let i = 0; i < input.N; i++) {
        const {X, Y} = input.XYList[i]
        p5.square(X, Y, 100)

        p5.push()
        {
          const color = p5.color('#0151A9');
          color.setAlpha(0.30 * 255)
          p5.fill(color)
          const r = output.PList[i] * 2;
          p5.ellipse(X, Y, r)
        }
        p5.pop()
      }


      // 住民を描画
      const ou = new OutputUtil(output.PList, output.BList.map(x => x == 1))
      const connectionStatus = ou.getConnectionStatus(input);
      const broadCastedStatus = ou.getBroadCastedStatus(input, connectionStatus);

      p5.push()
      {
        for (let k = 0; k < input.K; k++) {
          const item = input.ABList[k]
          const isBroadCasted = broadCastedStatus[k]

          if (isBroadCasted) {
            p5.fill(p5.color("lemonchiffon"))
          } else {
            p5.fill(p5.color('white'))
          }
          p5.ellipse(item.A, item.B, 100)
        }
      }
      p5.pop()

      // 通信ケーブルを描画
      p5.push()
      {
        for (let i = 0; i < input.M; i++) {
          const {U, V, W} = input.UVWList[i]
          const used = ou.edges[i]

          const weight = 10 + (50 * W) / 10000000

          p5.strokeWeight(weight)

          if (!used) {
            p5.stroke(p5.color(15, 24))
          } else {
            p5.stroke(p5.color(15, 120))
          }

          const u = input.XYList[U]
          const v = input.XYList[V]
          p5.line(u.X, u.Y, v.X, v.Y)


        }

      }
      p5.pop()
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





