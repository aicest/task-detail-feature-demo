import './main.scss'
import React, { useEffect, useCallback } from 'react'
import { AppSDK } from 'tb-apps-sdk'
import { hostAPI } from 'tb-apps-sdk/api/plugin'
import { render } from 'react-dom'

const webApp = AppSDK.fork(hostAPI)
webApp.init()

const Root: React.FC = () => {
  useEffect(() => {
    webApp.essage('info', {
      message: 'Hello Chang',
      description: 'From 3rd-Party Plugin'
    })

    let timeout = 1000
    let timer: number
    const nextTick = () => {
      timer = setTimeout(() => {
        webApp.refresh()
        timeout *= 2
        nextTick()
      }, timeout)
    }
    nextTick()

    return () => clearInterval(timer)
  })

  const handleClick = useCallback(() => {
    webApp.close()
  }, [])

  return (
    <main>
      <header>
        <h1>Task Detail Feature</h1>
        <a onClick={handleClick}>x</a>
      </header>
      <div className='container'>
        <div className='body'>
          <p>{location.href}</p>
        </div>
      </div>
    </main>
  )
}

const Mask: React.FC = (props) => {
  const handleClick = useCallback((ev: React.SyntheticEvent) => {
    if (ev.target === ev.currentTarget) {
      webApp.close()
    }
  }, [])

  return (
    <div className='mask' onClick={handleClick}>
      {props.children}
    </div>
  )
}

const main = () => {
  render(
    <Mask>
      <Root />
    </Mask>,
    document.getElementById('root')
  )
}

main()
