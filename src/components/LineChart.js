import React from 'react'
import { Typography, Row, Col } from 'antd'
import millify from 'millify'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const { Title } = Typography

const LineChart = ({ coinHistory, coinName, currentPrice }) => {
    const coinData = coinHistory?.data?.history
    const coinPrice = []
    const coinTimestamp = []

    for (let i = coinData?.length - 1; i > 0; i--) {
        coinPrice.push(coinData[i].price)
        coinTimestamp.push(new Date(coinData[i].timestamp * 1000).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {millify(currentPrice)}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart
