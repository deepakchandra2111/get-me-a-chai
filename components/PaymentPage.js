"use client"
import React, { useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, intiate } from '@/actions/userAction'
import { useEffect } from 'react'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const PaymentPage = ({ username }) => {
  //const { data: session } = useSession()
  const [paymentform, setpaymentform] = useState({ name: "" , message: "" , amount: ""})
  const [currentUser, setcurrentUser] = useState({})
  const [payments, setpayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()


  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(searchParams.get("paymentdone") == "true" ){
      toast('Payment Done', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    router.push(`/${username}`)
   
  }, [])
  


  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const getData = async () => {
    let u = await fetchuser(username)
    setcurrentUser(u)
    let dbpayments = await fetchpayments(username)
    setpayments(dbpayments)
  }


  const pay = async (amount) => {
    //get the order id
    let a = await intiate(amount, username, paymentform)

    let orderId = a.id
    var options = {
      "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Buy me a Chai", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    }

    var rzp1 = new Razorpay(options);
    rzp1.open();

  }
  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


      <div className='cover  w-full relative '>
        <img className='w-full object-cover h-48 md:h-[350px]' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/11318212/1664eb2941d146658d0f9ba548dce756/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/2.jpg?token-time=1728000000&token-hash=tInax5ROkI2xqTxTaHE7Ej9EblCv7jD3daQ6uqUK-ms%3D" alt="" />

        <div className='absolute -bottom-12 right-[30%] md:right-[45.5%] '>
          <img className='rounded-full border-2 border-white' width={150} height={150} src="https://i.pinimg.com/736x/b5/b1/81/b5b18135a600d2c003fcaa7c9857fb82.jpg" alt="" />
        </div>

      </div>

      <div className="info flex flex-col  items-center justify-center my-14  gap-2 ">
        <div className='font-bold text-lg'>
          @{username}
        </div>
        <div className='text-slate-400'>
          Lets help {currentUser.name} get a chai
        </div >
        <div className='text-slate-400'> 
          {payments.length} Payments .  ₹{payments.reduce((a,b) => a + b.amount ,0)} raised
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row ">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-7">
            {/* show list of all the supporters as a leaderboard */}
            <h2 className='text-2xl font-bold my-5 '>Supporters</h2>

            <ul className='mx-5 text-lg '>

              {payments.length == 0 && <li>No Payments Yet☹️</li>}

              {payments.map((p, i) => {
                return <li key={i} className='my-3 flex gap-2  items-center'>
                  <img src="ava.gif" width={33} alt="user avatar" />

                  <span>
                    {p.name} donated <span className='font-bold'>₹{(p.amount)}</span>  with a message "{p.message}"
                  </span>

                </li>

              })}

            </ul>

          </div>

          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-7">
            <h2 className='text-2xl font-bold my-5 '>Make a Payment</h2>
            <div className='flex gap-2 flex-col'>
              {/* input for name and message */}
              <div>
                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />

              </div>
              <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
              <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
              <button onClick={() => { pay(Number.parseInt(paymentform.amount * 100)) }} type='button' className='w-full p-3 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm disabled:bg-slate-600 disabled:from-slate-900' disabled={paymentform.name?.length < 3 ||
                paymentform.amount <= 0} >Pay Now</button>
            </div>
            {/* Or choose from these amounts */}
            <div className='flex gap-3 mt-5 flex-col md:flex-row'>
              <button className='bg-slate-800 p-3 ' onClick={() => { pay(1000) }}>Pay ₹10</button>
              <button className='bg-slate-800 p-3' onClick={() => { pay(2000) }}>Pay ₹20</button>
              <button className='bg-slate-800 p-3' onClick={() => { pay(3000) }}>Pay ₹50</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
