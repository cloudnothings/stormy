import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Navbar = ({ sessionData }: { sessionData: Session | null }) => {

  return (
    <div className="container flex flex-row p-2 justify-between min-w-max bg-neutral-800 gap-2 mb-4">
      <div className='flex flex-row'>
        <Link
          className="rounded-md p-2 font-semibold text-white no-underline transition hover:bg-white/20"
          href={'/'}
        >Home</Link>
        <Link
          className="rounded-md p-2 font-semibold text-white no-underline transition hover:bg-white/20"
          href={'/clients'}
        >Clients</Link>
      </div>
      <button
        className="rounded-md justify-self-end bg-white/10 p-2 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  )
}

export default Navbar