import { Card, Col, Row, Select, Typography } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.coindesk.com/resizer/FRBLNiNgZG31ZLE5XBmb4Tjzsys=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/EKF6D5ATWVC3DFZTXU5VNC2VRA.png';

interface NewsProps {
    simplified?: boolean;
}  

const News: React.FC<NewsProps> = ({ simplified = false }) => {
    const newsProvidersList = [
        { value: 'coindesk', label: 'Coindesk' },
        { value: 'cointelegraph', label: 'Cointelegraph' },
        { value: 'bitcoinist', label: 'Bitcoinist' },
        { value: 'decrypt', label: 'Decrypt' },
        { value: 'bsc', label: 'BSC News' },
        { value: 'theguardian', label: 'The Guardian' }
    ];
    const [newsProvider, setNewsProvider ] = useState('coindesk');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery(newsProvider);

    const getProviderLabel = (value) => {
        const provider = newsProvidersList.find((p) => p.value === value);
        return provider ? provider.label : '';
    };
    
    if (isFetching) return <Loader />;

    const newsToDisplay = simplified ? cryptoNews?.data.slice(0, 10) : cryptoNews?.data;
    return (
        <Row gutter={[ 24, 24 ]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a news provider'
                        optionFilterProp='children'
                        onChange={(value) => setNewsProvider(value)}
                        filterOption={(input, option) => 
                            option.children?.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {newsProvidersList.map((provider) => (
                            <Option key={provider.value} value={provider.value}>{provider.label}</Option>
                        ))}
                    </Select>

                </Col>
            )}
            {newsToDisplay?.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.title}</Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.thumbnail || demoImage} alt='news'/>
                            </div>
                            <p>
                                {news.description.length > 100 
                                ? `${news.description.substring(0,100)}...`
                                : news.description
                                }
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Text className="provider-name">{getProviderLabel(newsProvider)}</Text>
                                </div>
                                <Text>{moment(news?.createdAt).fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News