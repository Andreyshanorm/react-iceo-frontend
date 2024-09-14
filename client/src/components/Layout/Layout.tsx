import React from 'react'
import styles from './layout.module.css'
import { Layout as AntLayout } from 'antd'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

type Props = {
    children: React.ReactNode
}


export const Layout: React.FC<Props> = ({ children }) => {
  return (
      <div className={styles.layout}>
        <div className={styles.main}>
          <Header/>
          <AntLayout.Content>
              {children}
          </AntLayout.Content>
        </div>
        <Footer />
      </div>

  )
}
 