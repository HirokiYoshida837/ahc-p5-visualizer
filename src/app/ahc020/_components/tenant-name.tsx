import React, {useCallback, useEffect, useState} from 'react';

import {Button, IconButton, TextField} from "@charcoal-ui/react";
import styled from "styled-components";

export const TenantName: React.FC = (props) => {


  const [tname, setTname] = useState<string>('')
  useEffect(() => {
    setTname('tname')
  }, [])

  const clickHandler = useCallback(() => {
    setTname('fugafuga')
  }, [])


  const copyToClipBoard = (txt: string) => {
    navigator.clipboard.writeText(txt);
  }


  return (
    <Container>
      <TextField showLabel={true} label="テナント名" placeholder="テナント名" contentEditable={false}
                 value={tname}
                 suffix={
                   <IconButton
                     icon={'Inline/Images'} size="M" onClick={() => copyToClipBoard(tname)}
                     title={'copy to clipboard'}
                   />
                 }
      />

      <br/>

      <Button variant={'Primary'} onClick={clickHandler}>
        再生成する！
      </Button>

    </Container>
  )
}

const Container = styled.div`
  text-align: center;
  margin: 1rem;
  width: 600px;
`;
