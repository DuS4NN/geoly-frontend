export interface LogInUser {
    nickName: string,
    profileImage: string,
    mapTheme: number,
    darkMode: boolean,
    languageId: number,
    roles: string[]
}

export interface RankingPlayer {
    position: number,
    points: number,
    nickname: string,
    profileImage: string
}

