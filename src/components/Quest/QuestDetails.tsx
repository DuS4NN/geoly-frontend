import React, {useContext, useEffect, useRef, useState} from "react"
import {NavLink} from "react-router-dom"

import "./QuestDetails.scss"
import {UserContext} from "../../UserContext";
import Chart from "chart.js";

// Props
interface Props {
    details: any
}

// Component
const QuestDetails: React.FC<Props> = (props) => {

    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const difficultyChartContainer = useRef(null);
    const reviewChartContainer = useRef(null)
    const successChartContainer = useRef(null)

    const [date, setDate] = useState(new Date())

    const {details} = props

    const [image, setImage] = useState("")

    // Chart options
    const chartOptions = {
        cutoutPercentage: 90,
        circumference: Math.PI,
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        animation: {
            duration: 200,
        },
        rotation: Math.PI,
        scales: {
            yAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false
                }
            }],
            xAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false
                }
            }]
        }
    }

    useEffect(() => {
        if(details.categoryImage){
            setImage( require("../../"+details.categoryImage))

            setDate(new Date(details.questDate))

            // Custom chart
            Chart.defaults.RoundedDifficultyDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
            Chart.controllers.RoundedDifficultyDoughnut = Chart.controllers.doughnut.extend({
                draw: function(ease:any) {

                    var ctx           = this.chart.ctx;
                    var easingDecimal = ease || 1;
                    var arcs          = this.getMeta().data;

                    var width = this.chart.width,
                        height = this.chart.height;

                    var fontSize = (height / 85).toFixed(2);
                    this.chart.ctx.font = fontSize + "em OpenSans";
                    this.chart.ctx.textBaseline = "middle";

                    var text = details.questDifficulty,
                        textX = Math.round(width / 2),
                        textY = height / 1.5;

                    this.chart.ctx.fillText(text, textX, textY);

                    Chart.helpers.each(arcs, function(arc:any, i:any) {
                        arc.transition(easingDecimal).draw();

                        var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
                        var pColor = pArc._view.backgroundColor;

                        var vm         = arc._view;
                        var radius     = (vm.outerRadius + vm.innerRadius) / 2;
                        var thickness  = (vm.outerRadius - vm.innerRadius) / 2;
                        var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
                        var angle      = Math.PI - vm.endAngle - Math.PI / 2;

                        ctx.save();
                        ctx.translate(vm.x, vm.y);

                        ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
                        ctx.beginPath();
                        ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
                        ctx.fill();

                        ctx.fillStyle = vm.backgroundColor;
                        ctx.beginPath();
                        ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
                        ctx.fill();

                        ctx.restore();
                    });
                }
            });

            Chart.defaults.RoundedReviewDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
            Chart.controllers.RoundedReviewDoughnut = Chart.controllers.doughnut.extend({
                draw: function(ease:any) {

                    var ctx           = this.chart.ctx;
                    var easingDecimal = ease || 1;
                    var arcs          = this.getMeta().data;

                    var width = this.chart.width,
                        height = this.chart.height;

                    var fontSize = (height / 85).toFixed(2);
                    this.chart.ctx.font = fontSize + "em OpenSans";
                    this.chart.ctx.textBaseline = "middle";

                    let avgReviewValue = ""

                    if(details.questReview === null){
                        avgReviewValue = "0"
                    }else{
                        avgReviewValue = Math.round(details.questReview)+""
                    }

                    var text = avgReviewValue,
                        textX = Math.round(width / 2),
                        textY = height / 1.5;

                    this.chart.ctx.fillText(text, textX, textY);

                    Chart.helpers.each(arcs, function(arc:any, i:any) {
                        arc.transition(easingDecimal).draw();

                        var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
                        var pColor = pArc._view.backgroundColor;

                        var vm         = arc._view;
                        var radius     = (vm.outerRadius + vm.innerRadius) / 2;
                        var thickness  = (vm.outerRadius - vm.innerRadius) / 2;
                        var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
                        var angle      = Math.PI - vm.endAngle - Math.PI / 2;

                        ctx.save();
                        ctx.translate(vm.x, vm.y);

                        ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
                        ctx.beginPath();
                        ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
                        ctx.fill();

                        ctx.fillStyle = vm.backgroundColor;
                        ctx.beginPath();
                        ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
                        ctx.fill();

                        ctx.restore();
                    });
                }
            });

            Chart.defaults.RoundedSuccessDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
            Chart.controllers.RoundedSuccessDoughnut = Chart.controllers.doughnut.extend({
                draw: function(ease:any) {

                    var ctx           = this.chart.ctx;
                    var easingDecimal = ease || 1;
                    var arcs          = this.getMeta().data;

                    var width = this.chart.width,
                        height = this.chart.height;

                    var fontSize = (height / 70).toFixed(2);
                    this.chart.ctx.font = fontSize + "em OpenSans";
                    this.chart.ctx.textBaseline = "middle";

                    let successValue = Math.round(100 / (details.countFinish+1 + details.countOnStage + details.countCancel) * (details.countFinish+1))
                    if(isNaN(successValue)){
                        successValue = 0
                    }

                    var text = successValue+'%',
                        textX = Math.round((width - (this.chart.ctx.measureText(text).width)/2) / 2),
                        textY = height / 1.5;

                    this.chart.ctx.fillText(text, textX, textY);

                    Chart.helpers.each(arcs, function(arc:any, i:any) {
                        arc.transition(easingDecimal).draw();

                        var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
                        var pColor = pArc._view.backgroundColor;

                        var vm         = arc._view;
                        var radius     = (vm.outerRadius + vm.innerRadius) / 2;
                        var thickness  = (vm.outerRadius - vm.innerRadius) / 2;
                        var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
                        var angle      = Math.PI - vm.endAngle - Math.PI / 2;

                        ctx.save();
                        ctx.translate(vm.x, vm.y);

                        ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
                        ctx.beginPath();
                        ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
                        ctx.fill();

                        ctx.fillStyle = vm.backgroundColor;
                        ctx.beginPath();
                        ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
                        ctx.fill();

                        ctx.restore();
                    });

                }
            });

            const reviewChartConfig = {
                type: 'RoundedReviewDoughnut',
                data: {
                    datasets: [{
                        data: [details.questReview,5-details.questReview],
                        backgroundColor: [
                            'rgb(05, 194, 224)',
                            'rgb(240, 240, 240)'
                        ],
                        hoverBackgroundColor: [
                            'rgb(05, 194, 224)',
                            'rgb(240, 240, 240)'
                        ],
                        borderWidth: 0,
                        hoverBorderWidth: 0
                    }]
                },
                options: chartOptions
            }
            const difficultyChartConfig = {
                type: 'RoundedDifficultyDoughnut',
                data: {
                    datasets: [{
                        data: [details.questDifficulty,5-details.questDifficulty],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(240, 240, 240)'
                        ],
                        hoverBackgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(240, 240, 240)'
                        ],
                        borderWidth: 0,
                        hoverBorderWidth: 0
                    }]
                },
                options: chartOptions
            }
            const successChartConfig = {
                type: 'RoundedSuccessDoughnut',
                data: {
                    labels: [text.mapFilter.finish, text.mapFilter.pending, text.mapFilter.cancel],
                    datasets: [{
                        data: [details.countFinish+1, details.countOnStage, details.countCancel],
                        backgroundColor: [
                            '#A7E9AF',
                            '#81F5FF',
                            '#E36387',
                            'rgb(240, 240, 240)'
                        ],
                        hoverBackgroundColor: [
                            '#A7E9AF',
                            '#81F5FF',
                            '#E36387',
                            'rgb(240, 240, 240)'
                        ],
                        borderWidth: 0,
                        hoverBorderWidth: 0
                    }]
                },
                options: {...chartOptions,
                    tooltips: {
                        enabled: true
                    }}
            }

            const handleDifficultyGraphDraw = () => {
                if (difficultyChartContainer && difficultyChartContainer.current) {
                    setTimeout(() => {
                        //@ts-ignore
                        new Chart(difficultyChartContainer.current, difficultyChartConfig);
                    },300)
                }
            }
            const handleReviewGraphDraw = () => {
                if (reviewChartContainer && reviewChartContainer.current) {
                    setTimeout(() => {
                        //@ts-ignore
                        new Chart(reviewChartContainer.current, reviewChartConfig);
                    },300)
                }
            }
            const handleSuccessGraphDraw = () => {
                if (successChartContainer && successChartContainer.current) {
                    setTimeout(() => {
                        //@ts-ignore
                        new Chart(successChartContainer.current, successChartConfig);
                    },300)
                }
            }

            handleDifficultyGraphDraw()
            handleReviewGraphDraw()
            handleSuccessGraphDraw()
        }
    }, [details])

    // Template
    return (
        <div className="quest-details">
            <div className="quest-details-title">
                <span>{text.review.details}</span>
            </div>

            <div className="quest-details-description">
                <span>{details.questDescription}</span>
            </div>

            <div className="quest-details-graph">

                <div className="quest-detail-graph-difficulty">
                    <div className="quest-detail-graph-label">
                        <span>{text.mapFilter.difficulty}</span>
                    </div>
                    <canvas ref={difficultyChartContainer}>
                    </canvas>
                </div>
                <div className="quest-detail-graph-review">
                    <div className="quest-detail-graph-label">
                        <span>{text.mapFilter.review}</span>
                    </div>
                    <canvas ref={reviewChartContainer}>
                    </canvas>
                </div>
                <div className="quest-detail-graph-success">
                    <div className="quest-detail-graph-label">
                        <span>{text.mapFilter.success}</span>
                    </div>
                    <canvas ref={successChartContainer}>
                    </canvas>
                </div>
            </div>

        </div>
    )
}

export default QuestDetails
