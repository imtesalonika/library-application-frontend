import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Main from '@modules/main/Main'
import Login from '@modules/login/Login'
import Register from '@modules/register/Register'
import ForgetPassword from '@modules/forgot-password/ForgotPassword'
import RecoverPassword from '@modules/recover-password/RecoverPassword'
import { useWindowSize } from '@app/hooks/useWindowSize'
import { calculateWindowSize } from '@app/utils/helpers'
import { setWindowSize } from '@app/store/reducers/ui'
import ReactGA from 'react-ga4'

import Dashboard from '@app/pages/Dashboard/Dashboard'
import Blank from '@pages/Blank'
import SubMenu from '@pages/SubMenu'
import Profile from '@pages/profile/Profile'

import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import { setCurrentUser } from './store/reducers/auth'

import { firebaseAuth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from './store/store'
import { Loading } from './components/Loading'
import { BookPage } from '@pages/BookPage'
import { AddBookPage } from '@pages/AddBookPage'
import VisitorReport from './pages/Dashboard/VisitorReport'
import BorrowedBooksReport from './pages/Dashboard/BorrowedBooksReport'
import { TugasakhirPage } from './pages/TugasakhirPage'
import { AddBeritaPage } from './pages/AddBeritaPage'
import { AddTAPage } from './pages/AddTAPage'
import { BeritaPage } from './pages/BeritaPage'
import UserManagement from './pages/Dashboard/UserManagement'
import { DetailTAPage } from './pages/DetailTAPage'

const { VITE_NODE_ENV } = import.meta.env

const App = () => {
  const windowSize = useWindowSize()
  const screenSize = useAppSelector((state) => state.ui.screenSize)
  const dispatch = useAppDispatch()
  const location = useLocation()

  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (user) {
          dispatch(setCurrentUser(user))
        } else {
          dispatch(setCurrentUser(null))
        }
        setIsAppLoading(false)
      },
      (e) => {
        console.log(e)
        dispatch(setCurrentUser(null))
        setIsAppLoading(false)
      }
    )
  }, [])

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width)
    if (screenSize !== size) {
      dispatch(setWindowSize(size))
    }
  }, [windowSize])

  useEffect(() => {
    if (location && location.pathname && VITE_NODE_ENV === 'production') {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname,
      })
    }
  }, [location])

  if (isAppLoading) {
    return <Loading />
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<BookPage />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/edit-book/:id" element={<AddBookPage />} />
            <Route path="/tugasakhir" element={<TugasakhirPage />} />
            <Route path="/tugasakhir/add" element={<AddTAPage />} />
            <Route path="tugasakhir/detail" element={<DetailTAPage />} />
            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/addberita" element={<AddBeritaPage />} />
            <Route path="/VisitorReport" element={<VisitorReport />} />
            <Route
              path="/borrowed-books-report"
              element={<BorrowedBooksReport />}
            />
            <Route path="/user-management" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  )
}

export default App
