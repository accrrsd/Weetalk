import style from './route-menu.module.css'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ReactComponent as GuestsIcon } from '../../images/Application/persons.svg'
import { ReactComponent as GuestsIconSolid } from '../../images/Application/personsSolid.svg'
import { ReactComponent as FavoriteIcon } from '../../images/Application/star.svg'
import { ReactComponent as FavoriteIconSolid } from '../../images/Application/starSolid.svg'
import { ReactComponent as TipsIcon } from '../../images/Application/info.svg'
import { ReactComponent as TipsIconSolid } from '../../images/Application/infoSolid.svg'
import { ReactComponent as ProfileIcon } from '../../images/Application/user.svg'
import { ReactComponent as ProfileIconSolid } from '../../images/Application/userSolid.svg'

export const RouteMenu = () => {
  const [activeLink, setActiveLink] = useState('guests')
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    switch (path) {
      case '/application/guests':
        setActiveLink('guests')
        break
      case '/application/favorites':
        setActiveLink('favorites')
        break
      case '/application/advices':
        setActiveLink('advices')
        break
      case '/application/profile':
        setActiveLink('profile')
        break
    }
  }, [location])

  return (
    <div className={style.wrapper}>
      <ul className={style.menu}>
        <li>
          <NavLink to="/application/guests" className={style.navLink}>
            {activeLink === 'guests' ? <GuestsIconSolid className={style.menuIcon} /> : <GuestsIcon className={style.menuIcon} />}
            <span className={style.linkText}>Люди</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/application/favorites" className={style.navLink}>
            {activeLink === 'favorites' ? <FavoriteIconSolid className={style.menuIcon} /> : <FavoriteIcon className={style.menuIcon} />}
            <span className={style.linkText}>Избранное</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/application/advices" className={style.navLink}>
            {activeLink === 'advices' ? <TipsIconSolid className={style.menuIcon} /> : <TipsIcon className={style.menuIcon} />}
            <span className={style.linkText}>Советы</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/application/profile" className={style.navLink}>
            {activeLink === 'profile' ? <ProfileIconSolid className={style.menuIcon} /> : <ProfileIcon className={style.menuIcon} />}
            <span className={style.linkText}>Профиль</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
