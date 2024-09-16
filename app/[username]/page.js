import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {
  //if the user name is not present in the database then show 404 page
  const checkUser = async () => {
    await connectDb()
    const user = await User.findOne({ username: params.username })
    if (!user) {
      notFound()
    }
  }
  await checkUser()

  return (
    <>
      <PaymentPage username={params.username} />

    </>
  )
}

export default Username

//dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Fund your Creator`,
  }
}
