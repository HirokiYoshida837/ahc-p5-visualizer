import React, {useState} from "react";
import {Button, Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";

type Props = {
  inputValueHandler: (value: string) => void;
}

export const AHC020Output: React.FC<Props> = (props) => {
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <>
      <div className="flex flex-col items-center justify-center w-1/2 mt-6 ml-6">
        <Textarea
          key='output'
          label="Output"
          labelPlacement='outside'
          placeholder=" "
          description='AHC020 出力1'
          onValueChange={(v)=>setInputValue(v)}
          classNames={{
            input: "resize-y min-h-[80px]",
          }}
          disableAnimation
          disableAutosize
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
