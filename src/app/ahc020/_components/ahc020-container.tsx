import React, {useEffect, useState} from "react";
import {AHC020Input} from "@/app/ahc020/_components/input";

export const AHC020Container: React.FC = () => {

  const [rootValue, setRootValue] = useState<string>('')
  useEffect(() => {
    const pv = parseValue(rootValue)
  }, [rootValue])

  return (
    <>
      <AHC020Input
        inputValueHandler={(string) => {
          setRootValue(string)
        }}
      />

    </>
  )
}

type ParsedInput = {
  N: number,
  M: number,
  K: number,
  XYList: { X: number, Y: number }[],
  UVWList: { U: number, V: number, W: number }[],
  ABList: { A: number, B: number }[]
}


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
