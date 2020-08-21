import React, {ChangeEvent, FormEvent, useRef} from "react";
import {debounce} from "lodash-es";

interface Props {
    onSearch: (query: string) => void
}

const TunesSearchForm: React.FC<Props> = props => {
    const searchInput = useRef<HTMLInputElement>(null)

    const handleInput = debounce((e: ChangeEvent<HTMLInputElement>) => {
        searchForMusic()
    }, 500)

    // Input element
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        searchForMusic()
    }

    // Search for music
    const searchForMusic = () => {
        let searchString = searchInput.current?.value
        if(searchString) props.onSearch(searchString)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input autoFocus ref={searchInput} type="text" onChange={handleInput}/>
            </form>
        </div>
    )
}

export default TunesSearchForm
