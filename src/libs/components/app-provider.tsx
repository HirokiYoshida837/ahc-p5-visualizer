'use client'

import React, {FC, ReactNode} from 'react'
import {NextUIProvider} from "@nextui-org/react";

export const AppProvider: FC<{ children: ReactNode }> = ({children}) => {

  return (
    <>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </>
  )
}
