import React, {useEffect, useRef, useState} from "react"
import Chart from "chart.js";


// Props
interface Props {
    quests: any
}

// Component
const AdminMainQuestsGraph: React.FC<Props> = (props) => {

    const {quests} = props

    const text = require('../../../assets/languageText/admin').adminText

    const [dates, setDates] = useState([]) as Array<any>
    const [counts, setCounts] = useState([]) as Array<any>

    const chart = useRef(null);

    useEffect(() => {
        if(quests.length === 0) return

        let dateArray = []
        let dataArray = []

        const date = new Date()
        date.setDate(date.getDate()-1)

        for(let i=0; i<30; i++){
            let count = 0

            let object = quests.find((element:any) => element.day == date.getDate() && element.month == date.getMonth()+1)
            if(object !== undefined) count = object.count

            date.setDate(date.getDate()-1)

            dataArray.push(count)
            dateArray.push(date.getDate()+1+"."+(date.getMonth()+1))

        }
        setDates(dateArray.reverse())
        setCounts(dataArray.reverse())
    }, [quests])


    useEffect(() => {
        if (chart && chart.current && dates.length>0) {

            //@ts-ignore
           new Chart(chart.current, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: text.main.newQuests,
                        backgroundColor: '#EAFBF3',
                        borderColor: '#30dd8a',
                        data: counts
                    }]
                },
                options: {}
            });
        }
    }, [chart, dates])


    // Template
    return (
        <div className="adminMainQuestsGraph">

            <canvas ref={chart}>
            </canvas>

        </div>
    )
}

export default AdminMainQuestsGraph
