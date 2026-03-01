import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Mainlayout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
        {/* Navbar */}
        <nav className='bg-white shadow-md p-4 flex justify-between items-center px-8 sticky top-0 z-50'>
            <Link to="/" className='text-2xl font-bold text-orange-500 tracking-tight'>
            TRENDYOL <span className='text-black font-light'>LIGHT</span>
            </Link>

          <div className='flex gap-6 items-center'>
    
    <Link to="/" className='hover:text-orange-500 font-medium transition'>Ürünler</Link>
    
    <Link to="/cart" className='bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-sm'>
        Sepetim
    </Link>
</div>
        </nav>

        {/* Outlet */}
        <main className='container mx-auto py-8 px-4'>
            <Outlet/>
        </main> 
 <ToastContainer position='top-right' autoClose={3000} />
        {/* Footer */}
        <footer className='bg-white border-t mt-12 py-8 text-center text-gray-500'>
            <p>© 2026 Trendyol Light</p>
        </footer>
    </div>
  )
}

export default Mainlayout