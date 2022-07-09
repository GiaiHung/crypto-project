import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Row, Col, Statistic } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import Loader from './Loader'

const { Title } = Typography

const Homepage = () => {
  console.log(process.env.REACT_APP_CRYPTO_KEY);
  const { data, isFetching } = useGetCryptosQuery(10)

  if (isFetching) return <Loader />

  const { totalCoins, totalMarkets, totalExchanges, totalMarketCap, total24hVolume } = data?.data?.stats
  
  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>

      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={totalCoins} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={totalExchanges} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(totalMarkets)} />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies</Title>
        <Title level={3} className='show-more'>
          <Link to='/cryptocurrencies'>
            Show more
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className='home-title'>Latest news</Title>
        <Title level={3} className='show-more'>
          <Link to='/news'>
            Show more
          </Link>
        </Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage
