export type TTipPopupOffset = {
  left: number
  top: number
}

export type TFormValues = {
  photo: File
  name: string
  about: string
  work: string
}

export type TUserSubmitValues = {
  name: string
  about: string
  work: string
  file: File
}

export type TUserWithoutPhoto = {
  name: string
  about: string
  work: string
}

export type TUserPhoto = {
  file: File
}
