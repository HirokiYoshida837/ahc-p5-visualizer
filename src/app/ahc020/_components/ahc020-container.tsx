import React, {useState} from "react";
import {AHC020Input} from "@/app/ahc020/_components/io/input";
import {VisualizeContainer} from "@/app/ahc020/_components/visualizer/visualizeContainer";
import {AHC020Output} from "@/app/ahc020/_components/io/output";
import {parseInputValue} from "@/app/ahc020/_components/parser/input-parser";
import {parseOutputValue} from "@/app/ahc020/_components/parser/output-parser";

export const AHC020Container: React.FC = () => {

  const [rawInput, setRawInput] = useState<string>('')
  const [rawOutput, setRawOutput] = useState<string>('')

  const input = parseInputValue(rawInput)
  const output = parseOutputValue(rawOutput)

  return (
    <>
      <AHC020Input
        inputValueHandler={(value) => setRawInput(value)}
      />

      <AHC020Output
        inputValueHandler={(value) => setRawOutput(value)}
      />

      <VisualizeContainer
        input={input}
        output={output}
      />
    </>
  )
}

