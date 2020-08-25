import React, {useMemo, useEffect} from "react";
import {Song} from "../../types";
import {truncate} from "lodash-es";

interface Props {
    song: Song
}

const TunesSong: React.FC<Props> = props => {
    const {song} = props

    // Na cahovanie ale pri malych veciach ako toto - spojenie
    // dvoch stringov sa to vobec neoplati a je to neefektivne
    const songify = useMemo(() => (song: Song) => {
        const newTitle = song.artist + ' - ' + song.title;
        return shorten(newTitle, 100)},
        [song.artist, song.title])

    useEffect(() => {
        console.log("dasd")
    }, [])


    const shorten = (str: string, len = 55): string => {
        return truncate(str, {length: len});
    }

    return (
        <article>
            <div className="inside">
                <h2>{songify(song)}</h2>
                <div className="player">
                    {song.artwork && (
                        <img src={song.artwork} alt="" />
                    )}

                    <audio controls src={song.audioFile} />
                </div>
            </div>
            <footer>{shorten(song.album)}</footer>
        </article>
    )
}

export default TunesSong
