import React from 'react'
import styles from './layout.module.css'
import { Layout as AntLayout } from 'antd'
import { Header } from '../Header/Header'

type Props = {
    children: React.ReactNode
}


export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
        <Header/>
        <AntLayout.Content style={{ height: '80%' }}>
            {children}
        </AntLayout.Content>
    </div>
  )
}
 