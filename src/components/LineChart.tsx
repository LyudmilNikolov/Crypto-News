import { Col, Row, Typography } from 'antd';
import { CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { History } from '../models/history';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const { Title } = Typography;

interface LineChartProps {
    coinHistory: History;
    currentPrice: string;
    coinName: string;
}

const LineChart: React.FC<LineChartProps> = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = []
    const coinTimestamp = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }
    
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        const timestampInMilliseconds = new Date(coinHistory?.data?.history[i].timestamp * 1000);
        const formattedDate = timestampInMilliseconds.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    
        coinTimestamp.push(formattedDate);
    }

    const data = {
        labels: coinTimestamp.reverse(),
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    display: true,
                },
            }
        },
    };
    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
                    <Title level={5} className='current-change'>Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
};

export default LineChart;