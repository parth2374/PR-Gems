import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from './components/ui/skeleton'
import ProductDetail from './pages/shopping-view/product'
import ShoppingSearch from './pages/shopping-view/search'

function App() {

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  // if (isLoading) return <Skeleton className="w-screen h-screen" />;

  return (
    <div className='scrollable glitchy-div flex flex-col /* overflow-hidden */ bg-white overflow-x-hidden'>
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          {/* <Route path="register" element={<AuthRegister />} /> */}
        </Route>
        <Route path='/' element={<Navigate to='/shop/listing' replace />} />
        <Route path='/admin'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path='/shop' element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<ShoppingSearch />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="product/:productId" element={<ProductDetail />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
