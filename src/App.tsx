import { Layout, Space, Typography } from 'antd';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { CryptoDetails, Cryptocurrencies, HomePage, Navbar, News } from './components';

function App() {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
            <div className='routes'>
              <HashRouter>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                  <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                  <Route path='/news' element={<News />} />
                </Routes>
              </HashRouter>
            </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2024
            Crypto News <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App
