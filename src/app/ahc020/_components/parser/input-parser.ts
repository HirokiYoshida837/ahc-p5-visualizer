// TODO : LINQ使いたい。
import {ParsedInput} from "@/app/ahc020/_components/type";

export const parseInputValue = (inputValue: string): ParsedInput => {

  if (inputValue == '') {
    return InitialParsedInput
  }


  const read = inputValue.split(/\r\n|\n/);

  const [N, M, K] = read[0].split(' ').map(x => Number(x))
  const XYList = read.slice(1, 1 + N)
    .map(x => x.split(' ').map(x => Number(x)))
    .map(x => {
      return {
        X: x[0],
        Y: x[1]
      }
    });


  const UVWList = read.slice(1 + N, 1 + N + M)
    .map(x => x.split(' ').map(y => Number(y)))
    .map(x => {
      // 後処理で扱いやすいように0-indexedにする
      return {
        U: x[0] - 1,
        V: x[1] - 1,
        W: x[2]
      }
    })

  const ABList = read.slice(1 + N + M, 1 + N + M + K)
    .map(x => x.split(' ').map(x => Number(x)))
    .map(x => {
      return {
        A: x[0],
        B: x[1]
      }
    })

  return {
    N,
    M,
    K,
    XYList,
    UVWList,
    ABList
  }
}

export const InitialParsedInput: ParsedInput = {
  ABList: [], K: 0, M: 0, N: 0, UVWList: [], XYList: []
}

