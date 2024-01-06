/* eslint-disable @typescript-eslint/no-unused-vars */
//import { React } from 'react';
import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { Avatar, Button, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large'/>
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Crypto News</Link>
                </Typography.Title>
            </div>
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />}>
                <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />}>
                <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />}>
                <Link to='/exchanges'>Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                <Link to='/news'>News</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Navbar