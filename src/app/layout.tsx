import "../../styles/globals.css";
import React from 'react'
import {AppProvider} from "@/libs/components/app-provider";


export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
    <body>
    <AppProvider>
      {children}
    </AppProvider>
    </body>
    </html>
  );

}


