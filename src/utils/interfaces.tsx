import { Dispatch, SetStateAction } from 'react'

export interface ICard {
  id: null | number
  username: string
  imageName: string
  isLiked: boolean
  actualJob: string
}

export interface ILoadedCard extends ICard {
  description: string
  contacts?: null | {
    email: string | null
    telegram: string | null
  }
}

export interface IRoom {
  id: string
  roomName: string
  usersIn: ICard[]
  beginingDate: string
}

export interface IRemoveModalProps {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  roomName: string
}
