import { useNavigate } from "react-router-dom";

function NotFound() {

  const navigate = useNavigate()

  return (
    <section className="bg-white">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <button onClick={() => navigate('/')} type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Back To Homepage</button>
        </div>   
    </div>
</section>
  );
}

export default NotFound;