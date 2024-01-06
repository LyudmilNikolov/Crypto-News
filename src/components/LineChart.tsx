/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
                    <Title level={5} className='current-change'>Current {coinName} Price: $ {currentPrice?.data?.change}</Title>
                </Col>
            </Row>
        </>
    )
};

export default LineChart;