import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import { Image } from '@profabric/react-components';
import styled from 'styled-components';
import { SidebarSearch } from '@app/components/sidebar-search/SidebarSearch';
import i18n from '@app/utils/i18n';
import { useAppSelector } from '@app/store/store';

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon',
    path: '/',
  },
  {
    name: i18n.t('menusidebar.label.buku'),
    icon: 'fas fa-book nav-icon',
    path: '/books',
  },
  {
    name: i18n.t('menusidebar.label.tugas_akhir'),
    icon: 'fas fa-graduation-cap nav-icon',
    path: '/tugasakhir',
  },
  {
    name: i18n.t('menusidebar.label.berita'),
    icon: 'fas fa-newspaper nav-icon',
    path: '/berita',
  },
  {
    name: i18n.t('menusidebar.label.rekap_data'),
    icon: 'fas fa-chart-bar nav-icon',
    path: '/data-recapitulation',
  },
];

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const sidebarSkin = useAppSelector((state) => state.ui.sidebarSkin);
  const menuItemFlat = useAppSelector((state) => state.ui.menuItemFlat);
  const menuChildIndent = useAppSelector((state) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="img/logo.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={currentUser?.photoURL}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to={'/profile'} className="d-block">
              {currentUser?.email}
            </Link>
          </div>
        </div>

        <div className="form-inline">
          <SidebarSearch />
        </div>

        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
