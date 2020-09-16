import React from "react"
import GroupsImage from "../components/Groups/GroupsImage";
import GroupsList from "../components/Groups/GroupsList";

// Props
interface Props {
}

// Component
const Groups: React.FC<Props> = (props) => {

    // Template
    return (
        <div className="groups">
            <GroupsImage />
            <GroupsList />
        </div>
    )
}

export default Groups
