import React, {useContext, useEffect, useState} from "react"
import Slider from '@material-ui/core/Slider';
import {withStyles} from '@material-ui/core/styles';
import Toggle from 'react-toggle'
import axios from 'axios'
import chroma from 'chroma-js';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Select, {components} from "react-select";
import {debounce} from "lodash-es";
import {useAlert} from "react-alert";
import {UserContext} from "../../UserContext";

import '../Elements/Toggle.scss'
import './MapFilter.scss'

// Props
interface Props {
    mapRef: any
    setDifficulty: (difficulty:any) => void
    setReview: (review:any) => void
    setNoReviewed: (category:any) => void
    setCategory: (category:any) => void

    noReviewed: boolean
    review: any
    difficulty: any

    handleSearchClick: () => void
}

interface Category {
    value: number
    label: string
    color: string
    imageUrl: string
}

// Component
const MapFilter: React.FC<Props> = (props) => {

    //@ts-ignore
    const {userContext} = useContext(UserContext)
    const {mapRef, setDifficulty, setReview, setNoReviewed, setCategory, noReviewed, review, difficulty, handleSearchClick} = props

    const [rollFilter, setRollFilter] = useState(true)
    const [categoryList, setCategoryList] = useState([])
    const [address, setAddress] = useState("")

    const {Option} = components;

    const alert = useAlert()
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const colors:any = {
        HISTORY: '#e80054',
        ART: '#754ca0',
        VIEW: '#73d4ff',
        ARCHITECTURE: '#fccb5b',
        NATURE: '#53dc92',
        CULTURE: '#ff4155'
    }

    // Images
    const loadingImage = require("../../assets/images/otherIcons/loading.svg")
    const arrowUp = require("../../assets/images/otherIcons/arrow-up.svg")
    const arrowDown = require("../../assets/images/otherIcons/arrow-down.svg")

    // On start
    useEffect( () => {
        getAllCategories()
    }, [])

    // Methods
    const getAllCategories = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/categories'
        }).then(function (response) {
            let categories:Category[] = response.data.map((category:any) => extractCategoriesFromResponse(category))
            //@ts-ignore
            setCategoryList(categories)
        })
    }

    const extractCategoriesFromResponse = (category:any) => {
        return {
            value: category.id,
            label: text.category[category.name.toLowerCase()],
            color: colors[category.name],
            imageUrl: require("../../"+category.imageUrl)
        } as Category
    }

    const handleClickSearchButton = () => {
       handleSearchClick()
    }

    const handleCategoryChange = (e:any) => {
        if(e==null) return
        let category:number[] = e.map((category:Category) => extractCategoryFromInput(category))
        //@ts-ignore
        setCategory(category)
    }

    const extractCategoryFromInput = (category:any) => {
        return category.value
    }

    const handleAddressSelect = debounce((e) => {
        setAddress(e)
        geocodeByAddress(e)
            .then(results => getLatLng(results[0]))
            .then(latLng=> mapRef.setCenter(latLng))
            .catch(error => alert.error(text.mapFilter.placeNotFound))

        handleSearchClick()
    },500)

    const handleAddressChange = (address : any) => {
        setAddress(address)
    }

    const handleDifficultyChange = (event:any, value:any) => {
        setDifficulty(value)
    }

    const handleReviewChange = (event:any, value:any) => {
        setReview(value)
    }

    const handleNotReviewedChange = () => {
        setNoReviewed(!noReviewed)
    }

    const handleRollChange = () => {
        setRollFilter(!rollFilter)
    }

    //@ts-ignore
    const IconOption = (props: categoryList) => (
        <Option {...props}>
            <div className="map-filter-select">
                <div className="map-filter-select-image">
                    <img src={props.data.imageUrl} alt=""/>
                </div>
                <div className="map-filter-select-label">
                    {props.data.label}
                </div>
            </div>
        </Option>
    )

    // Inline style
    const customStyle = {
        //@ts-ignore
        control: (styles, state) => ({ ...styles,
            backgroundColor: 'white',
            color: state.isFocused ? '#023a1c' : '',
            boxShadow: 'none',
            borderColor: state.isFocused ? '#2bb673' : 'hsl(0,0%,80%)',
            '&:hover': {borderColor: state.isFocused ? '#2bb673' : 'hsl(0,0%,60%)'}
        }),
        //@ts-ignore
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : null,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                },
            };
        },
        //@ts-ignore
        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        //@ts-ignore
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        //@ts-ignore
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        }),
    };
    const PrettoSlider = withStyles({
        root: {
            color: '#52af77',
            height: 8,
        },
        thumb: {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            marginTop: -8,
            marginLeft: -12,
            '&:focus, &:hover, &$active': {
                boxShadow: 'inherit',
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)',
        },
        track: {
            height: 8,
            borderRadius: 4,
        },
        rail: {
            height: 8,
            borderRadius: 4,
        },
    })(Slider);

    // Template
    return (
        <div className={rollFilter ? "map-filter" : "map-filter hidden" }>
            <div className="map-filter-arrow">
                <img onClick={handleRollChange} src={rollFilter ? arrowUp : arrowDown} alt="" />
            </div>


            <div className="map-filter-search">
                <div className="map-filter-label">{text.mapFilter.placeLabel}</div>
                <PlacesAutocomplete
                    value={address}
                    onChange={handleAddressChange}
                    onSelect={handleAddressSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: text.mapFilter.searchPlacesPlaceholder,
                                    className: 'location-search-input'
                                })}
                            />


                            <div className="dropdown-container">
                                {loading && <div className="dropdown-container-loading"><img src={loadingImage} alt="" /></div>}
                                {suggestions.map( (suggestion, index) => {

                                    const className = suggestion.active
                                        ? 'suggestion-item--active item'+index
                                        : 'suggestion-item item'+index
                                    const key = index
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

            </div>


            <div className="map-filter-category">
                <div className="map-filter-label">{text.mapFilter.categoryLabel}</div>
                    <Select
                        closeMenuOnSelect={false}
                        onChange={handleCategoryChange}
                        isMulti
                        options={categoryList}
                        placeholder={text.mapFilter.selectCategory}
                        noOptionsMessage={() => text.mapFilter.noCategoryLeft}
                        className="custom-select"
                        styles={customStyle}
                        components={{Option: IconOption}}
                    />
            </div>

            <div className="map-filter-sliders">
                <div className="map-filter-label">{text.mapFilter.difficultyLabel}</div>
                <PrettoSlider
                    className="pretto-slider"
                    defaultValue={difficulty}
                    valueLabelDisplay="auto"
                    onChangeCommitted={handleDifficultyChange}
                    min={1}
                    max={5}
                />

                <div className="map-filter-label">{text.mapFilter.reviewLabel}</div>
                <PrettoSlider
                    className="pretto-slider"
                    defaultValue={review}
                    valueLabelDisplay="auto"
                    onChangeCommitted={handleReviewChange}
                    min={1}
                    max={5}
                />

                <div  className= "map-filter-toggle">
                    <div className="map-filter-label">{text.mapFilter.unreviewLabel}</div>
                    <Toggle
                        defaultChecked={true}
                        onChange={handleNotReviewedChange}
                        icons={{
                            checked: null,
                            unchecked: null,
                        }}
                    />
                </div>

            </div>

            <div className="map-filter-submit">
                <button onClick={handleClickSearchButton}>{text.mapFilter.findButton}</button>
            </div>
        </div>
    )
}

export default MapFilter

