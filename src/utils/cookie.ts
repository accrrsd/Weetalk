// Создание кук

type TCookieProps = {
  path?: string
  expires?: number | string | Date
}

export function setCookie(name: string, value: string, props?: TCookieProps) {
  props = props || { path: '/' }
  let exp = props.expires
  if (typeof exp == 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName as keyof TCookieProps]
    //@ts-ignore:next-line
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}
export function getCookie(name: string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') // eslint-disable-line
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function eraseCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;'
}
