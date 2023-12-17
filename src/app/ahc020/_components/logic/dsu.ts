// UnionFind
export class Dsu {
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

    // console.log("leader a", a)
    // console.log("parentOrSize", this.parentOrSize)
    // console.log("parentOrSize[a]", this.parentOrSize[a])

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

