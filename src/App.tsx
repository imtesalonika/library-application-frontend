import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Main from '@modules/main/Main'
import Login from '@modules/login/Login'
import { useWindowSize } from '@app/hooks/useWindowSize'
import { calculateWindowSize } from '@app/utils/helpers'
import { setWindowSize } from '@app/store/reducers/ui'
import ReactGA from 'react-ga4'

import Dashboard from '@app/pages/Dashboard/Dashboard'
import Profile from '@pages/profile/Profile'

import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import { setCurrentUser } from '@store/reducers/auth'

import { firebaseAuth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '@store/store'
import { Loading } from './components/Loading'
import VisitorReport from './pages/Dashboard/VisitorReport'
import { LaporanPeminjamanPage } from './pages/Dashboard/LaporanPeminjamanPage'

import { BookDetailPage } from '@pages/Buku/BookDetailPage'
import { TugasakhirPage } from '@pages/TugasAkhir/TugasakhirPage'
import { AddPengumumanPage } from '@pages/Pengumuman/AddPengumumanPage'
import { AddTAPage } from '@pages/TugasAkhir/AddTAPage'
import { PengumumanPage } from '@pages/Pengumuman/PengumumanPage'
import { DetailTAPage } from '@pages/TugasAkhir/DetailTAPage'
import { BookPage } from '@pages/Buku/BookPage'
import { AddBookPage } from '@pages/Buku/AddBookPage'
import { DetailPeminjamanPage } from './pages/Dashboard/DetailPeminjamanPage'
import { UserManagement } from './pages/Dashboard/UserManagement'
import { PengumumanDetailPage } from '@pages/Pengumuman/PengumumanDetailPage'
import { AddUser } from './pages/Dashboard/AddUser'
import { UserDetail } from './pages/Dashboard/UserDetail'
import { UserEdit } from './pages/Dashboard/UserEdit'
import CompleteData from '@pages/Auth/CompleteData'
import PinjamBuku from '@pages/Buku/PinjamBuku'

const { VITE_NODE_ENV } = import.meta.env

const App = () => {
  const windowSize = useWindowSize()
  const screenSize = useAppSelector((state) => state.ui.screenSize)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    setIsAppLoading(false)
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
        <Route path="/login">
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/complete_data/:id" element={<CompleteData />} />

        {/* Private Routes */}
        <Route path="/">
          <Route path="/" element={<Main />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />

            {/*Bagian routing buku*/}
            <Route path="/book" element={<BookPage />} />
            <Route path="/borrow-book" element={<PinjamBuku />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/book/add" element={<AddBookPage />} />
            <Route path="/book/edit/:id" element={<AddBookPage />} />

            {/* Bagian routing pengumuman */}
            <Route path="/pengumuman" element={<PengumumanPage />} />
            <Route path="/pengumuman/add" element={<AddPengumumanPage />} />
            <Route path="/pengumuman/:id" element={<PengumumanDetailPage />} />
            <Route
              path="/pengumuman/edit/:id"
              element={<AddPengumumanPage />}
            />
            {/*Bagian routing pengumuman end*/}

            <Route path="/tugasakhir" element={<TugasakhirPage />} />
            <Route path="/tugasakhir/add" element={<AddTAPage />} />
            <Route path="/tugasakhir/detail" element={<DetailTAPage />} />

            <Route
              path="/dashboard/visitor-report"
              element={<VisitorReport />}
            />
            <Route
              path="/dashboard/borrowed-books-detail"
              element={<DetailPeminjamanPage />}
            />
            <Route
              path="/dashboard/borrowed-books-report"
              element={<LaporanPeminjamanPage />}
            />
            <Route
              path="/dashboard/user-management"
              element={<UserManagement />}
            />
            <Route
              path="/dashboard/user-management/add"
              element={<AddUser />}
            />
            <Route
              path="/dashboard/user-management/detail/:id"
              element={<UserDetail />}
            />
            <Route
              path="/dashboard/user-management/edit/:id"
              element={<UserEdit />}
            />
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
