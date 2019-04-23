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
    <>
      <header>Task Detail</header>
      <div>
        <p>{location.href}</p>
        <p>
          [<a onClick={handleClick}>close</a>]
        </p>
      </div>
    </>
  )
}

const main = () => {
  render(<Root />, document.querySelector('main'))
}

main()
