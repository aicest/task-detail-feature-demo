import './main.scss'
import React, { useEffect } from 'react'
import { AppSDK } from 'tb-apps-sdk'
import { hostAPI } from 'tb-apps-sdk/api/internal'
import { render } from 'react-dom'

const webApp = AppSDK.fork(hostAPI)
webApp.init()

const Root: React.FC = () => {
  useEffect(() => {
    webApp.essage('info', {
      message: 'Hello Chang',
      description: 'From 3rd-Party Plugin'
    })
  })

  return (
    <>
      <header>{location.href}</header>
      <div>^^</div>
    </>
  )
}

const main = () => {
  render(<Root />, document.querySelector('main'))
}

main()
