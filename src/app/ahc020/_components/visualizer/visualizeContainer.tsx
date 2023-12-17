'use client'

import {ParsedInput, ParsedOutput} from "@/app/ahc020/_components/type";
import React, {useState} from "react";
import {P5Container} from "@/app/ahc020/_components/visualizer/p5-container";


type Props = {
  input: ParsedInput,
  output: ParsedOutput[],
}

export const VisualizeContainer: React.FC<Props> = ({input, output}: Props) => {

  const [age, setAge] = useState(0);
  const handleChange = (v: string) => {
    setAge(Number(v));
  };


  return (
    <>
      <>
        <label htmlFor="age">age : {age} </label>
        <input type="range" value={age} min="0" max={output.length - 1} id="age" name="age"
               disabled={output.length == 0 || output.length == 1}
               onChange={(e) => handleChange(e.target.value)}
        />
      </>
      <br/>

      <>
        N: {input.N},
        M: {input.M},
        K: {input.K},
      </>

      <br/>

      <>
        キャンバスを右クリックすると画像を保存できます
      </>

      <>
        <P5Container input={input} output={output[age]}/>
      </>

    </>
  )
}






