import React from "react"
import SettingsImage from "../components/Settings/SettingsImage";
import SettingsList from "../components/Settings/SettingsList";

// Props
interface Props {
}

// Component
const Settings: React.FC = () => {

    // Template
    return (
        <div className="settings">
            <SettingsImage />
            <SettingsList />
        </div>
    )
}

export default Settings
