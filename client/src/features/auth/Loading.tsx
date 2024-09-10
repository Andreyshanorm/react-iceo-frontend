import React from 'react'
import { useCurentQuery } from '../../app/services/auth'

type Children = {
  children : JSX.Element
}


export const Loading = ( { children }: Children ) => {
  const { isLoading } = useCurentQuery()

  if(isLoading){
    return <span>Загрузка....</span>
  }


  return children
}
