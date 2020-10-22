import React, {useContext, useEffect, useRef} from "react";
import {useHistory} from "react-router-dom"
import {UserContext} from "../../UserContext";
import Chart from 'chart.js';


import './MapQuestDetail.scss'

interface Props {
    questDetail: any
    setQuestDetail: (questDetail:any) => void
}

const MapQuestDetail: React.FC<Props> = (props) => {

    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const {questDetail, setQuestDetail} = props

    const difficultyChartContainer = useRef(null);
    const reviewChartContainer = useRef(null)
    const successChartContainer = useRef(null)

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

            var text = questDetail.difficulty,
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

            if(questDetail.avgReview === null){
                avgReviewValue = "0"
            }else{
                avgReviewValue = Math.round(questDetail.avgReview)+""
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

            let successValue = Math.round(100 / (questDetail.countFinish+1 + questDetail.countOnStage + questDetail.countCancel) * (questDetail.countFinish+1))
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

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const history = useHistory()

    // Methods
    const handleCloseDetail = () => {
        setQuestDetail(null)
    }

    const reviewChartConfig = {
        type: 'RoundedReviewDoughnut',
        data: {
            datasets: [{
                data: [questDetail?.avgReview,5-questDetail?.avgReview],
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
                data: [questDetail?.difficulty,5-questDetail?.difficulty],
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
                data: [questDetail?.countFinish+1, questDetail?.countOnStage, questDetail?.countCancel],
                backgroundColor: [
                    '#A7E9AF',
                    '#81F5FF',
                    '#E36387',
                ],
                hoverBackgroundColor: [
                    '#A7E9AF',
                    '#81F5FF',
                    '#E36387',
                ],
                borderWidth: 0,
                hoverBorderWidth: 0
            }]
        },
        options: {...chartOptions,
        tooltips: {
            enabled: false
        }}
    }



    useEffect(() => {
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
    }, [difficultyChartConfig, reviewChartConfig, successChartConfig])

    const handleRedirect = () => {
        history.push("/quest/"+questDetail.questId)
    }

    return (
        <div className={questDetail ? "map-quest-detail" : "map-quest-detail hidden"}>
            {questDetail && (

                <div className="quest-detail-content">

                    <div className="quest-detail-header">

                        <div className="quest-detail-category">
                            <div className="quest-detail-category-image">
                                <img src={require("../../"+questDetail.categoryImg)} alt=""/>
                            </div>
                            <div className="quest-detail-category-name">
                                <span>{text.category[questDetail.categoryName.toLowerCase()]}</span>
                            </div>
                        </div>

                        <div className="quest-detail-exit">
                            <button onClick={handleCloseDetail}>X</button>
                        </div>

                        <div className="quest-detail-title">
                            <span>{questDetail.questName}</span>
                        </div>
                    </div>

                    <div className="quest-detail-header-bottom">
                        <img alt="" src={require("../../assets/images/obliqueBottom.svg")} />
                    </div>

                    <div className="quest-detail-description">
                        <span>{questDetail.description}</span>
                    </div>

                    <div className="quest-detail-graph">
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

                    <div className="quest-detail-button">
                        <button onClick={handleRedirect}>{text.mapFilter.showButton}</button>
                    </div>

                </div>
            )}
        </div>
    )
}

export default MapQuestDetail
