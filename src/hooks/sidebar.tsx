import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

interface SidebarContextData {
  routeName: string
  onChangeRouteName: (routeName: string) => void
}

const SidebarContext = createContext<SidebarContextData>({} as SidebarContextData)

const SidebarProvider: React.FC = ({ children }) => {
  const [routeName, setRouteName] = useState('')

  const onChangeRouteName = useCallback((routeName: string)=> {
    setRouteName(routeName)
  },[routeName,setRouteName])


  return (
    <SidebarContext.Provider
      value={{
        routeName,
        onChangeRouteName
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

function useSideBar(): SidebarContextData {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSideBar must be used within an SideBarProvider')
  }

  return context
}

export { SidebarProvider, useSideBar }
