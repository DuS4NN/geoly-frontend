export interface Song {
    id: number
    artist: string
    audioFile: string
    artwork?: string
    title: string
    album: string
}

export interface LogInUser {
    nickName: string,
    profileImage: string,
    mapTheme: number,
    darkMode: boolean,
    languageId: number
}

