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
