import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { StyledBigUserImage, StyledSmallUserImage } from '@app/styles/common'
import {
  UserBody,
  UserFooter,
  UserHeader,
  UserMenuDropdown,
} from '@app/styles/dropdown-menus'
import { firebaseAuth } from '@app/firebase'
import {} from '@app/index'
import { useAppSelector } from '@app/store/store'
import { DateTime } from 'luxon'
import { apiUrl } from '@app/utils/env'

const UserDropdown = () => {
  const navigate = useNavigate()
  const [t] = useTranslation()
  const currentUser = JSON.parse(localStorage.getItem('user_data')!)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const logOut = async (event: any) => {
    setDropdownOpen(false)
    navigate('/login')
  }

  const navigateToProfile = (event: any) => {
    event.preventDefault()
    setDropdownOpen(false)
    navigate('/profile')
  }

  return (
    <UserMenuDropdown isOpen={dropdownOpen} hideArrow>
      <StyledSmallUserImage
        slot="head"
        src={`${apiUrl}/${currentUser?.foto_profil}`}
        fallbackSrc="/img/default-profile.png"
        alt="User"
        width={25}
        height={25}
        rounded
      />
      <div slot="body">
        <UserHeader className=" bg-primary">
          <StyledBigUserImage
            src={`${apiUrl}/${currentUser?.foto_profil}`}
            fallbackSrc="/img/default-profile.png"
            alt="User"
            width={90}
            height={90}
            rounded
          />
          <p>
            <p>{currentUser?.name}</p>
          </p>
        </UserHeader>

        <UserFooter>
          <button
            type="button"
            className="btn btn-default btn-flat"
            onClick={navigateToProfile}
          >
            {t('header.user.profile')}
          </button>
          <button
            type="button"
            className="btn btn-default btn-flat float-right"
            onClick={logOut}
          >
            Sign Out
          </button>
        </UserFooter>
      </div>
    </UserMenuDropdown>
  )
}

export default UserDropdown
