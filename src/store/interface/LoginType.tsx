export type TLoginData = {
    userNameOrEmailAddress: string
    password: string
    rememberClient: boolean
  }

export type TInputData = {
    userNameOrEmailAddress: string
    password: string
  }

export type TUserInfo = {
    id: number
    name: string
    surname: string
    userName: string
    emailAddress: string
    avatarPath: string
  }

export type TLoginState = {
    accessToken: string
    user: TUserInfo
  }
