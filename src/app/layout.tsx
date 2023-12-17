import React from 'react'
import {AppProvider} from "@/libs/components/app-provider";


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (

    <html lang="ja">
    <body>
    <AppProvider>
      {children}
    </AppProvider>
    </body>
    </html>

  );

}


