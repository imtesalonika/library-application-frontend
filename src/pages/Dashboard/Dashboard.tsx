import { apiUrl } from '@app/utils/env'
import { ContentHeader, SmallBox } from '@components'
import {
  faUsers,
  faBook,
  faExchangeAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [todayVisitor, setTodayVisitor] = useState(0);

  const getVisitorInfo = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/visitor`);
      setTodayVisitor(response.data.data.length);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getVisitorInfo().then();
  }, [])

  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Total Users */}
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Total Users"
                text="1,200"
                navigateTo="/dashboard/user-management"
                variant="info"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>

            {/* Total Books */}
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Total Books"
                text="5,400"
                navigateTo="/book"
                variant="success"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faBook}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>

            {/* Books Borrowed Report */}
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Books Borrowed"
                text="1,030"
                navigateTo="/dashboard/borrowed-books-report"
                variant="warning"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faExchangeAlt}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>

            {/* Visitors */}
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Visitors Today"
                text={`${todayVisitor }`}
                navigateTo="/dashboard/visitor-report"
                variant="danger"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
