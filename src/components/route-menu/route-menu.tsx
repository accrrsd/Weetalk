import { NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as GuestsIcon } from '../../images/Guests.svg'
import { ReactComponent as FavoriteIcon } from '../../images/Favorite.svg'
import { ReactComponent as TipsIcon } from '../../images/Tips.svg'
import { ReactComponent as ProfileIcon } from '../../images/Profile.svg'
import style from './route-menu.module.css'
import { useEffect, useState } from 'react'

export const RouteMenu = () => {
  const [activeLink, setActiveLink] = useState('guests')
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    switch (path) {
      case '/':
        setActiveLink('guests')
        break
      case '/favorite':
        setActiveLink('favorite')
        break
      case '/recommendations':
        setActiveLink('recommendations')
        break
      case '/profile':
        setActiveLink('profile')
        break
      default:
        break
    }
  }, [location])

  const checkActiveClass = (str: string) => (activeLink === str ? `${style.navLink} ${style.navLinkActive}` : style.navLink)

  return (
    <div className={style.wrapper}>
      <ul className={style.menu}>
        <li>
          <NavLink to="/" className={() => checkActiveClass('guests')}>
            <GuestsIcon className={style.menuIcon}></GuestsIcon>
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorite" className={() => checkActiveClass('favorite')}>
            <FavoriteIcon className={style.menuIcon}></FavoriteIcon>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recommendations" className={() => checkActiveClass('recommendations')}>
            <TipsIcon className={style.menuIcon}></TipsIcon>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={() => checkActiveClass('profile')}>
            <ProfileIcon className={style.menuIcon}></ProfileIcon>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
