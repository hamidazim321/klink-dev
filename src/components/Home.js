import React from 'react'
import { useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { setUser } from '../redux/CurrentUser/currentUser'
import { auth } from '../firebase'

export default function Home() {
  const dispatch = useDispatch()
  const handleLogOut = async() => {
    try {
      await signOut(auth)
      dispatch(setUser(null))
      console.log('logged out')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <button type='button' onClick={handleLogOut}>Logout</button>
    </div>
  )
}
