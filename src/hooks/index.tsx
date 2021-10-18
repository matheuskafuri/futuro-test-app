import React from 'react'
import { SidebarProvider } from './sidebar'

const AppProvider: React.FC = ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>
}

export default AppProvider
