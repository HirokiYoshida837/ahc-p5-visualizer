import React, {useCallback, useState} from "react";
import {AHC020Input} from "@/app/ahc020/_components/input";
import {ParsedInput} from "@/app/ahc020/type";
import {VisualizeInput} from "@/app/ahc020/_components/visualize-input";

export const AHC020Container: React.FC = () => {

  const [parsedInput, setParsedInput] = useState<ParsedInput>(InitialParsedInput);
  const inputHandler = useCallback((value: string) => {
    const parsedInput1 = parseValue(value);
    setParsedInput(parsedInput1)
  }, [])

  return (
    <>
      <AHC020Input
        inputValueHandler={inputHandler}
      />

      <VisualizeInput input={parsedInput}/>
    </>
  )
}


// TODO : LINQ使いたい。
const parseValue = (inputValue: string): ParsedInput => {

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
      return {
        U: x[0],
        V: x[1],
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

const InitialParsedInput: ParsedInput = {
  ABList: [], K: 0, M: 0, N: 0, UVWList: [], XYList: []
}
