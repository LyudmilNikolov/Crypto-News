import { Card, Col, Row, Select, Typography } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
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
    
    if (isFetching) return <div>Loading...</div>;
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
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
                                <Text>{moment(news?.createdAt).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News