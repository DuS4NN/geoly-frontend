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
    map: any
}

interface Category {
    value: number
    label: string
    color: string
    imageUrl: string
}

// Component
const MapFilter: React.FC<Props> = (props) => {

    const [categoryFind, setCategoryFind] = useState([1,2,3,4,5,6])
    const [difficultyFind, setDifficultyFind] = useState([1,5])
    const [reviewFind, setReviewFind] = useState([1,5])
    const [unreviewed, setUnreviewed] = useState(true)
    const [rollFilter, setRollFilter] = useState(true)

    const {map} = props

    //@ts-ignore
    const {userContext} = useContext(UserContext)
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

    const loadingImage = require("../../assets/images/otherIcons/loading.svg")

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

    useEffect( () => {
        getAllCategories()
    }, [])

    // Methods
    const getAllCategories = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/categories'
        }).then(function (response) {
            let categories:Category[] = response.data.map((category:any) => extractData(category))
            //@ts-ignore
            setCategoryList(categories)
        })
    }

    const extractData = (category:any) => {
        return {
            value: category.id,
            label: text.category[category.name.toLowerCase()],
            color: colors[category.name],
            imageUrl: require("../../"+category.imageUrl)
        } as Category
    }

    const handleChange = (address : any) => {
        setAddress(address)
    }

    const handleSelect = debounce((e) => {
        setAddress(e)
        geocodeByAddress(e)
            .then(results => getLatLng(results[0]))
            .then(latLng=> map.setCenter(latLng))
            .catch(error => alert.error(text.mapFilter.placeNotFound))
    },500)

    const handleCategoryChange = (e:any) => {
        if(!e) return
        let category:number[] = e.map((category:Category) => extractCategory(category))
        setCategoryFind(category)
    }

    const extractCategory = (category:Category) => {
        return category.value
    }

    const handleDifficultyChange = (event:any, value:any) => {
        setDifficultyFind(value)
    }

    const handleReviewChange = (event:any, value:any) => {
        setReviewFind(value)
    }

    const handleToggleChange = () => {
        setUnreviewed(!unreviewed)
    }

    const handleRoll = () => {
        setRollFilter(!rollFilter)
    }

    const handleSearch = () => {
        console.log(categoryFind)
        console.log(difficultyFind)
        console.log(reviewFind)
        console.log(unreviewed)
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

    const arrowUp = require("../../assets/images/otherIcons/arrow-up.svg")
    const arrowDown = require("../../assets/images/otherIcons/arrow-down.svg")

    // Template
    return (
        <div className={rollFilter ? "map-filter" : "map-filter hidden" }>
            <div className="map-filter-arrow">
                <img onClick={handleRoll} src={rollFilter ? arrowUp : arrowDown} alt="" />
            </div>


            <div className="map-filter-search">
                <div className="map-filter-label">{text.mapFilter.placeLabel}</div>
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
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
                    defaultValue={difficultyFind}
                    valueLabelDisplay="auto"
                    onChangeCommitted={handleDifficultyChange}
                    min={1}
                    max={5}
                />

                <div className="map-filter-label">{text.mapFilter.reviewLabel}</div>
                <PrettoSlider
                    className="pretto-slider"
                    defaultValue={reviewFind}
                    valueLabelDisplay="auto"
                    onChangeCommitted={handleReviewChange}
                    min={1}
                    max={5}
                />

                <div  className= "map-filter-toggle">
                    <div className="map-filter-label">{text.mapFilter.unreviewLabel}</div>
                    <Toggle
                        defaultChecked={true}
                        onChange={handleToggleChange}
                        icons={{
                            checked: null,
                            unchecked: null,
                        }}
                    />
                </div>

            </div>

            <div className="map-filter-submit">
                <button onClick={handleSearch}>{text.mapFilter.findButton}</button>
            </div>
        </div>
    )
}

export default MapFilter

