import React, {useState} from "react";
import styled from "styled-components";
import {Button, TextArea} from "@charcoal-ui/react";

type Props = {
  inputValueHandler: (value: string) => void;
}

export const AHC020Output: React.FC<Props> = (props) => {


  const [inputValue, setInputValue] = useState<string>('')


  return (
    <>
      <Container>
        <TextArea
          showLabel
          label="Output"
          placeholder="Output"
          autoHeight={false}
          onChange={(value)=>{setInputValue(value)}}
        />
        <br/>


        <Button variant={'Primary'} onClick={() => {
          props.inputValueHandler(inputValue)
        }}>
          表示を更新する
        </Button>

      </Container>
    </>
  )
}

const Container = styled.div`
  text-align: center;
  margin: 1rem;
  width: 600px;
`;
