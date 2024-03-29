import React, {useContext, useEffect, useRef} from "react"
import "./QuestDetails.scss"
import {UserContext} from "../../UserContext";
import Chart from "chart.js";
import QuestMap from "./QuestMap";
import QuestStages from "./QuestStages";

// Props
interface Props {
    details: any
    stages: any
}

// Component
const QuestDetails: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const difficultyChartContainer = useRef(null);
    const reviewChartContainer = useRef(null)
    const successChartContainer = useRef(null)

    const {details, stages} = props



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
            // Custom chart
            Chart.defaults.RoundedDifficultyDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
            Chart.controllers.RoundedDifficultyDoughnut = Chart.controllers.doughnut.extend({
                draw: function(ease:any) {

                    var ctx           = this.chart.ctx;
                    var easingDecimal = ease || 1;
                    var arcs          = this.getMeta().data;

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
                        if(difficultyChartContainer && difficultyChartContainer.current){
                            //@ts-ignore
                            new Chart(difficultyChartContainer.current, difficultyChartConfig);
                        }
                    },300)
                }
            }
            const handleReviewGraphDraw = () => {
                if (reviewChartContainer && reviewChartContainer.current) {
                    setTimeout(() => {
                        if(reviewChartContainer && reviewChartContainer.current){
                            //@ts-ignore
                            new Chart(reviewChartContainer.current, reviewChartConfig);
                        }
                    },300)
                }
            }
            const handleSuccessGraphDraw = () => {
                if (successChartContainer && successChartContainer.current) {
                    setTimeout(() => {
                        if(successChartContainer && successChartContainer.current){
                            //@ts-ignore
                            new Chart(successChartContainer.current, successChartConfig);
                        }
                    },300)
                }
            }

            handleDifficultyGraphDraw()
            handleReviewGraphDraw()
            handleSuccessGraphDraw()
        }
    }, [details, chartOptions, text])

    // Template
    return (
        <div className="quest-details">
            <div className="quest-details-title">
                <span>{text.review.description}</span>
            </div>

            <div className="quest-details-description">
                <span>{details.questDescription}</span>
            </div>

            <QuestMap stages={stages} />

            <div className="details-title">
                <span>{text.review.details}</span>
            </div>

            <div className="details-container">
                <div className="quest-details-graph">

                    <div className="quest-detail-graph-difficulty">
                        <div className="quest-detail-graph-label">
                            <span>{text.mapFilter.difficulty}</span>
                        </div>
                        <canvas ref={difficultyChartContainer}>
                        </canvas>
                        <div className="graph-label">
                            {details.questDifficulty}
                        </div>
                    </div>
                    <div className="quest-detail-graph-review">
                        <div className="quest-detail-graph-label">
                            <span>{text.mapFilter.review}</span>
                        </div>
                        <canvas ref={reviewChartContainer}>
                        </canvas>
                        <div className="graph-label">
                            {details.questReview === null ? 0 : Math.round(details.questReview)}
                        </div>
                    </div>
                    <div className="quest-detail-graph-success">
                        <div className="quest-detail-graph-label">
                            <span>{text.mapFilter.success}</span>
                        </div>
                        <canvas ref={successChartContainer}>
                        </canvas>
                        <div className="graph-label">
                            {isNaN(Math.round(100 / (details.countFinish+1 + details.countOnStage + details.countCancel) * (details.countFinish+1))) ? 0 : Math.round(100 / (details.countFinish+1 + details.countOnStage + details.countCancel) * (details.countFinish+1))}%
                        </div>
                    </div>
                </div>
                <QuestStages stages={stages}/>
            </div>


        </div>
    )
}

export default QuestDetails
