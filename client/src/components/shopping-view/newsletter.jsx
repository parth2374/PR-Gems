import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus('success')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="relative mx-auto my-12 max-w-[1000rem] rounded-xl bg-[#DFFFF1] p-7 md:grid md:grid-cols-2 md:rounded-l-xl md:rounded-r-none md:p-12">
      <div className="max-w-[37rem]">
        <h2 className="mb-4 text-2xl text-black basic-heading md:text-[33px]">
          📦 Don’t Miss Our Gem Drops!
        </h2>
        <p className="text-md mb-6 font-medium leading-7 text-[#919895] md:text-xl">
          Be the first to hear about new stones, back-in-stock favorites, and special offers. <br />
          Get tips on sourcing, pricing, customs, and logistics from our us.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-full border border-white bg-white p-3 text-gray-800 placeholder-gray-400 outline-none"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`rounded-full px-5 py-3 font-semibold text-white transition-colors ${
              status === 'loading' ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-green-500">Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-500">Something went wrong. Please try again.</p>
        )}
      </div>
      <div
        className="absolute right-0 hidden h-full w-2/5 md:flex items-center justify-center"
        style={{
          clipPath: 'polygon(0 0, 10% 100%, 100% 100%, 100% 0)',
        }}
      >
				<img src="https://ecommerce-fullstack-web-app.netlify.app/static/media/newsletter.5931358dd220a40019fc.png" alt="" />
			</div>
    </div>
  )
}

export default Newsletter