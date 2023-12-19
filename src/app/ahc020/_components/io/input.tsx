import React, {useState} from "react";
import {Button} from "@nextui-org/button";
import {Textarea} from "@nextui-org/input";

type Props = {
  inputValueHandler: (value: string) => void;
}

export const AHC020Input: React.FC<Props> = (props) => {

  const [inputValue, setInputValue] = useState<string>('')

  return (
    <>
      <div className="flex flex-col items-center justify-center w-1/2 mt-6 ml-6">
        <Textarea
          key='input'
          label="Input"
          labelPlacement='outside'
          placeholder=" "
          description='AHC020 入力1'
          onValueChange={(v)=>setInputValue(v)}
          classNames={{
            input: "resize-y min-h-[40px]",
          }}
          disableAnimation
        />

        <Button
          type='submit'
          color='primary'
          onClick={()=>{
            props.inputValueHandler(inputValue)
          }}
        >
          表示を更新する
        </Button>
      </div>
    </>
  )
}
