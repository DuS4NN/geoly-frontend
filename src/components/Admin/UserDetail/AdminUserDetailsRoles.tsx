import React, {useEffect, useState} from "react"
import axios from "axios"
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import Select from "react-select";

// Props
interface Props {
    id: number
    roles: any
    setRoles: (roles:any) => void
}

// Component
const AdminUserDetailsRoles: React.FC<Props> = (props) => {

    const text = require('../../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    const {roles, setRoles, id} = props

    const [roleList, setRoleList] = useState([]) as Array<any>

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
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                        ? '#EAFBF3'
                        : isFocused
                            ? '$EAFBF3'
                            : null,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                ':hover':{
                  backgroundColor: '#EAFBF3'
                },
                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled && (isSelected ? '#EAFBF3' : '#EAFBF3'),
                },
            };
        }
    };

    useEffect(() => {
        if(roles.length === 0 || roleList.length > 0) return

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminRoles',
            withCredentials: true
        }).then(function (response) {
            setRoleList(response.data.map((role:any) => {
                return {
                    value: role.id,
                    label: role.name,
                    active: roles.includes(role.id)
                }
            }))
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })


    }, [roles])

    const handleChangeRole = (e:any) => {
        if(e===null){
            setRoles([])
            return
        }
        setRoles(e.map((role:any) => {
            return role.value
        }))
    }

    const handleSave = () => {
        if(roles.length === 0){
            alert.error(text.error.CHOOSE_ROLE)
            return
        }
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminUpdateRoles?id='+id,
            withCredentials: true,
            data: roles
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    // Template
    return (
        <div className="adminUserDetailsRoles">

            {roleList.length>0 && (
                <div className="adminUserDetailsRolesContainer">
                    <div className="roleSelect">
                        <Select
                            closeMenuOnSelect={false}
                            onChange={handleChangeRole}
                            defaultValue={roleList.filter((role:any) => role.active)}
                            isMulti
                            options={roleList}
                            styles={customStyle}
                            className="custom-select"
                        />
                    </div>

                    <div className="roleSubmit">
                        <button onClick={handleSave}>{text.userDetails.save}</button>
                    </div>

                </div>
            )}

        </div>
    )
}

export default AdminUserDetailsRoles
