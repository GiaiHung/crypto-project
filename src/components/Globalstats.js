import React from 'react'
import millify from 'millify';
import { Row, Col, Typography, Statistic, Collapse } from 'antd'
import { useGetCryptoGlobalstatsQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Title, Text } = Typography
const { Panel } = Collapse

const Globalstats = () => {
  const { data, isFetching } = useGetCryptoGlobalstatsQuery()

  if (isFetching) return <Loader />

  const { totalCoins, totalMarkets, totalExchanges, totalMarketCap, bestCoins, newestCoins } = data?.data

  return (
    <>
      <Row>
        <Col span={12}>
          <Statistic className='stats' title="Total Coins" value={totalCoins} />
        </Col>
        <Col span={12}>
          <Statistic className='stats' title="Total Markets" value={totalMarkets} />
        </Col>
        <Col span={12}>
          <Statistic className='stats' title="Total Market Cap" value={millify(totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic className='stats' title="Total Exchanges" value={millify(totalExchanges)} />
        </Col>
      </Row>

      <Col style={{marginBottom: '1.5rem'}}>
        <Title level={2}>Best coins</Title>
        <Collapse>
          {
            bestCoins.map((coin, index) => (
              <Panel header={(
                <Row>
                  <img className='exchange-image' src={coin.iconUrl} alt={coin.name} />
                  <Text><strong>{coin.symbol.toUpperCase()}.</strong></Text>
                </Row>
              )}
                key={index}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}
              >
                <Title level={3} style={{ textTransform: 'capitalize' }}>Full name: {coin.name}</Title>
                <Row>
                  <Text>More details in coin ranking:</Text>
                  <a href={coin.coinrankingUrl} target="_blank" rel='noreferrer' className='coin-ranking-link'>
                    link
                  </a>
                </Row>
              </Panel>
            ))
          }
        </Collapse>
      </Col>

      <Col>
        <Title level={2}>Newest coins</Title>
        <Collapse>
          {
            newestCoins.map((coin, index) => (
              <Panel header={(
                <Row>
                  <img className='exchange-image' src={coin.iconUrl} alt={coin.name} />
                  <Text><strong>{coin.symbol.toUpperCase()}.</strong></Text>
                </Row>
              )}
                key={index}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}
              >
                <Title level={3} style={{ textTransform: 'capitalize' }}>Full name: {coin.name}</Title>
                <Row>
                  <Text>More details in coin ranking:</Text>
                  <a href={coin.coinrankingUrl} target="_blank" rel='noreferrer' className='coin-ranking-link'>
                    link
                  </a>
                </Row>
              </Panel>
            ))
          }
        </Collapse>
      </Col>
    </>
  )
}

export default Globalstats
