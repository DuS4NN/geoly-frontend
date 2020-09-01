import React, {ChangeEvent, useContext, useEffect, useRef, useState} from "react"
import axios from 'axios'
import chroma from 'chroma-js';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import './MapFilter.scss'
import Select, {components} from "react-select";
import {capitalize, debounce} from "lodash-es";
import {useAlert} from "react-alert";
import {UserContext} from "../../UserContext";


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

    const {map} = props

    //@ts-ignore
    const {userContext, setUserContext} = useContext(UserContext)
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
    const searchStyle = {
        cursor: 'pointer',
        width: '280px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontFamily: 'OpenSans',
        fontSize: '15px',
        letterSpacing: '0.8px',
        paddingLeft: '10px',
        paddingRight: '10px',
        verticalAlign: 'middle',
        borderRadius: '5px',
        paddingTop: '15px',
        paddingBottom: '15px'
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

    // Template
    return (
        <div className="map-filter">
            <div className="map-filter-search">

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

                            <div className="autocomplete-dropdown-container">
                                {loading && <div className="dropdown-container-loading"><img src={loadingImage} alt="" /></div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#eff6f4', ...searchStyle }
                                        : { backgroundColor: '#ffffff', ...searchStyle}
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
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
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={categoryList}
                    placeholder={text.mapFilter.selectCategory}
                    noOptionsMessage={() => text.mapFilter.noCategoryLeft}
                    className="custom-select"
                    styles={customStyle}
                    components={{Option: IconOption}}
                />
            </div>

            <div className="map-filter-difficulty">


            </div>

        </div>
    )

    /* Nastavit si polohu - input s nazvom mesta, štátu
     Filtrovať úlohy {

     - typ - select
     - náročnosť - posuvník
     - review - posuvník
     - unreviewed - checkbox
     }
    */
}

export default MapFilter

