import { InfoBox } from '@app/components/info-box/InfoBox';
import { ContentHeader, SmallBox } from '@components';
import {
  faUsers,
  faBook,
  faExchangeAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
   
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Total Users"
                text="1,200"
                navigateTo="/users"
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
    
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Total Books"
                text="5,400"
                navigateTo="/books"
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
      
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Books Borrowed"
                text="1,030"
                navigateTo="/borrowed-books"
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
                text="340"
                navigateTo="/visitors"
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
  );
};

export default Dashboard;
