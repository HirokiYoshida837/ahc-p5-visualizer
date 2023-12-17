import {ParsedInput} from "@/app/ahc020/_components/type";
import {Dsu} from "@/app/ahc020/_components/logic/dsu";

export class OutputUtil {
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

