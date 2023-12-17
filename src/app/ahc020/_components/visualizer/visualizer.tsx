'use client'

import {ParsedInput, ParsedOutput} from "@/app/ahc020/_components/type";
import {SketchComponent} from "@/libs/components/sketch-components";
import p5Types from "p5";


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


class OutputUtil {
  powers: number[]
  edges: boolean[]

  constructor(powers: number[], edges: boolean[]) {
    this.powers = powers;
    this.edges = edges;
  }

  public getBroadCastedCount() {

  }

  public getConnectionStatus(input: ParsedInput) {

    const dsu = new Dsu(input.N)

    for (let i = 0; i < this.edges.length; i++) {
      const used = this.edges[i]
      if (!used) {
        continue
      }

      const {U, V, W} = input.UVWList[i]

      dsu.merge(U, V)
    }

    const ret = new Array<boolean>();
    for (let i = 0; i < input.N; i++) {
      ret.push(dsu.same(0, i))
    }

    return ret;
  }

  public getBroadCastedStatus(input: ParsedInput, isConnected: boolean[]): boolean[] {

    const broadCasted = new Array<boolean>();

    for (let i = 0; i < input.N; i++) {
      if (!isConnected[i]) {
        continue
      }

      for (let k = 0; k < input.K; k++) {

        const A = input.XYList[i]
        const B = input.ABList[k]
        const dist = calcSqDist(A.X, A.Y, B.A, B.B);

        const power = this.powers[i];
        if (dist <= power * power) {
          broadCasted[k] = true
        }
      }
    }
    return broadCasted
  }

  public calcCost() {

  }

  public calcPowerCost() {
  }
}

export function calcSqDist(ax: number, ay: number, bx: number, by: number): number {
  const dx = ax - bx;
  const dy = ay - by;

  return dx * dx + dy * dy;
}


// UnionFind
class Dsu {
  n: number
  parentOrSize: number[]

  constructor(n: number) {
    this.n = n;
    this.parentOrSize = new Array<number>(n + 1).fill(-1);
  }

  public merge(a: number, b: number): number {

    let x = this.leader(a);
    let y = this.leader(b);

    if (x == y) {
      return x
    }

    if (-this.parentOrSize[x] < -this.parentOrSize[y]) {
      // swap
      const tmp = x;
      x = y;
      y = tmp;
    }

    this.parentOrSize[x] += this.parentOrSize[y];

    this.parentOrSize[y] = x;
    return x;

  }

  public same(a: number, b: number): boolean {
    return this.leader(a) == this.leader(b)
  }

  public leader(a: number): number {

    console.log("leader a", a)
    console.log("parentOrSize", this.parentOrSize)
    console.log("parentOrSize[a]", this.parentOrSize[a])

    if (this.parentOrSize[a] < 0) {
      return a
    }


    this.parentOrSize[a] = this.leader(this.parentOrSize[a])
    return this.parentOrSize[a]
  }

  public size(a: number): number {
    const x = this.leader(a);
    return -this.parentOrSize[x]
  }

  public groups() {

    const leaderBuf = new Array<number>(this.n)
    const groupSize = new Array<number>(this.n)

    for (let i = 0; i < this.n; i++) {
      leaderBuf[i] = this.leader(i);
      groupSize[leaderBuf[i]] += 1;
    }

    const result = new Array<number[]>(this.n);

    for (let i = 0; i < this.n; i++) {
      result[i] = new Array<number>(groupSize[i])
    }

    for (let i = 0; i < this.n; i++) {
      result[leaderBuf[i]].push(i)
    }

    const res = result.filter(x => x == null || x.length == 0)
    return res;
  }


}

