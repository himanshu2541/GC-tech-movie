import React from 'react'
import { Link } from 'react-router-dom'

const Links = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Link to ='/'>Home</Link>
      <Link to = '/login'>Login</Link>
      <Link to = '/register'>register</Link>
      <Link to ='/get-users'>Get Users</Link>
      <Link to = '/me'>Account</Link>
    </div>
  )
}

export default Links