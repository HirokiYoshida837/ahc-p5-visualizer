import React, {useState} from "react";
import {AHC020Input} from "@/app/ahc020/_components/io/input";
import {Visualizer} from "@/app/ahc020/_components/visualizer/visualizer";
import {AHC020Output} from "@/app/ahc020/_components/io/output";
import {parseInputValue} from "@/app/ahc020/_components/parser/input-parser";
import {parseOutputValue} from "@/app/ahc020/_components/parser/output-parser";

export const AHC020Container: React.FC = () => {

  const [rawInput, setRawInput] = useState<string>('')
  const [rawOutput, setRawOutput] = useState<string>('')

  const input = parseInputValue(rawInput)
  const output = parseOutputValue(rawOutput)


  const [age, setAge] = useState(0);
  const handleChange = (v: string) => {
    setAge(Number(v));
    console.log(age)
  };

  return (
    <>
      <AHC020Input
        inputValueHandler={(value) => setRawInput(value)}
      />

      <AHC020Output
        inputValueHandler={(value) => setRawOutput(value)}
      />

      <>
        <label htmlFor="age">age : {age} </label>
        <input type="range" value={age} min="0" max={output.length - 1} id="age" name="age"
               disabled={output.length == 0 || output.length == 1}
               onChange={(e) => handleChange(e.target.value)}
        />
      </>

      <br/>

      <Visualizer
        input={input}
        output={output[age]}
      />
    </>
  )
}

