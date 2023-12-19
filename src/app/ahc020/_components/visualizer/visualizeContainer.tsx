'use client'

import {ParsedInput, ParsedOutput} from "@/app/ahc020/_components/type";
import React, {useState} from "react";
import {P5Container} from "@/app/ahc020/_components/visualizer/p5-container";
import {Slider} from "@nextui-org/react";
import {Button} from "@nextui-org/button";


type Props = {
  input: ParsedInput,
  output: ParsedOutput[],
}

export const VisualizeContainer: React.FC<Props> = ({input, output}: Props) => {

  const [age, setAge] = useState(0);
  const handleChange = (v: number | number[]) => {
    if (Array.isArray(v)) {
      setAge(v[0])
    } else {
      setAge(v);
    }
  };

  const incrementAge = (age: number) => {
    if (age < output.length - 1) {
      setAge(age + 1)
    }
  }

  const decrementAge = (age: number) => {
    if (0 < age) {
      setAge(age - 1)
    }
  }

  return (
    <>
      <div className={"ml-6"}>

        {/* controller */}
        <div className="flex flex-wrap gap-4 items-center mt-3">
          <Slider
            size="md"
            step={1}
            color="primary"
            label="age"
            showSteps={true}
            value={age}
            minValue={0}
            maxValue={output.length - 1}
            defaultValue={0}
            isDisabled={output.length == 0 || output.length == 1}
            getValue={(sv) => `${sv} of ${output.length - 1} age`}
            className="max-w-xl mb-3"
            onChange={(v) => handleChange(v)}
          />

          <Button isIconOnly color="primary" onClick={(e) => decrementAge(age)}>
            ❮
          </Button>

          <Button isIconOnly color="primary" onClick={(e) => incrementAge(age)}>
            ❯
          </Button>
        </div>

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

      </div>

    </>
  )
}






