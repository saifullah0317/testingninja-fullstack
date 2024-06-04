import React from 'react'
import Link from 'next/link'
export default function VerifyAccount() {
  return (
    <div className="w-96 border-swhite shadow-2xl rounded-lg py-10 px-10 flex flex-col space-y-6">
      <div className="flex flex-col mb-6">
        <span className="text-3xl text-spurple-300 font-bold text-center">
          testingninja
        </span>
        <span className="text-lg text mt-3 text-center text-spurple-300">
          Register a New Account
        </span>
      </div>
      aaaaa
      <div className="h-12" />
      <div className="flex flex-row justify-between items-center">
        <Link href="/login">
          <span className="text-lg font-semibold text-spurple-300">
            Login instead
          </span>
        </Link>
        <button
          className="bg-spurple-300 rounded-lg text-swhite text-lg font-semibold py-2 px-5"
          onClick={createAccount}
        >
          Sign up
        </button>
      </div>
    </div>
  )
}
