import React, {useEffect, useRef, useState} from "react"
import Chart from "chart.js";


// Props
interface Props {
    categoryRation: any
    counts: any
}

// Component
const AdminMainCategoryGraph: React.FC<Props> = (props) => {

    const {categoryRation, counts} = props

    const text = require('../../../assets/languageText/admin').adminText


    const [label, setLabel] = useState([]) as Array<any>
    const [data, setData] = useState([]) as Array<any>

    const chart = useRef(null);

    useEffect(() => {
        if(categoryRation.length === 0) return

        let dataArray = [] as any
        let labelArray = [] as any

        categoryRation.map((category:any) => {
            dataArray.push(category.count)
            labelArray.push(category.name)
        })

        setLabel(labelArray)
        setData(dataArray)
    }, [categoryRation])

    useEffect(() => {
        if (chart && chart.current && data.length>0) {

            console.log(data)

            //@ts-ignore
            new Chart(chart.current, {
                type: 'pie',
                data: {
                    labels: label,
                    datasets: [{
                        backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
                        data: data
                    }]
                },
                options: {

                }
            });
        }
    }, [chart, data])


    // Template
    return (
        <div className="adminMainCategoryGraph">
            <canvas ref={chart}>
            </canvas>
        </div>
    )
}

export default AdminMainCategoryGraph
