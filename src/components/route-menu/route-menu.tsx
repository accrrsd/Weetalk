import style from './route-menu.module.css'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ReactComponent as GuestsIcon } from '../../images/persons.svg'
import { ReactComponent as GuestsIconSolid } from '../../images/personsSolid.svg'
import { ReactComponent as FavoriteIcon } from '../../images/star.svg'
import { ReactComponent as FavoriteIconSolid } from '../../images/starSolid.svg'
import { ReactComponent as TipsIcon } from '../../images/info.svg'
import { ReactComponent as TipsIconSolid } from '../../images/infoSolid.svg'
import { ReactComponent as ProfileIcon } from '../../images/user.svg'
import { ReactComponent as ProfileIconSolid } from '../../images/userSolid.svg'

export const RouteMenu = () => {
  const [activeLink, setActiveLink] = useState('guests')
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    switch (path) {
      case '/guests':
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

  return (
    <div className={style.wrapper}>
      <ul className={style.menu}>
        <li>
          <NavLink to="/guests" className={style.navLink}>
            {activeLink === 'guests' ? <GuestsIconSolid className={style.menuIcon} /> : <GuestsIcon className={style.menuIcon} />}
            <span className={style.linkText}>Люди</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorite" className={style.navLink}>
            {activeLink === 'favorite' ? <FavoriteIconSolid className={style.menuIcon} /> : <FavoriteIcon className={style.menuIcon} />}
            <span className={style.linkText}>Избранное</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recommendations" className={style.navLink}>
            {activeLink === 'recommendations' ? <TipsIconSolid className={style.menuIcon} /> : <TipsIcon className={style.menuIcon} />}
            <span className={style.linkText}>Советы</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={style.navLink}>
            {activeLink === 'profile' ? <ProfileIconSolid className={style.menuIcon} /> : <ProfileIcon className={style.menuIcon} />}
            <span className={style.linkText}>Профиль</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
