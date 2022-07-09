import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Select } from 'antd'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import millify from 'millify';
import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
  const cryptoDetails = data?.data?.coin

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: 'Number of exchanges', value: `${cryptoDetails.numberOfExchanges && millify(cryptoDetails.numberOfExchanges)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  const { name, symbol, description, links, price } = cryptoDetails

  return (
    <Col className='coin-detail-container'>
      {/* Heading */}
      <Col className='coin-heading-container'>
        <Title className='coin-name' level={2}>
          {name} ({symbol}) Price
        </Title>
        <p>
          {name} live price in US Dollar (USD). View value statistics, market cap and supply.
        </p>
      </Col>

      {/* Select */}
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select time period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date, index) => <Option key={index}>{date}</Option>)}
      </Select>

      {/* Line chart... */}
      <LineChart
        coinHistory={coinHistory}
        coinName={name}
        currentPrice={price}
      />

      <Col className='stats-container'>
        {/* Coin Stats */}
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{name} Value Statistics</Title>
            <p>An overview showing the statistics of {name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {
            stats.map(({ title, value, icon }, index) => (
              <Col className="coin-stats" key={index}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))
          }
        </Col>

        {/* Other coins stats */}
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Value Statistics</Title>
            <p>An overview showing the statistics of all cryptocurrencies, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {
            genericStats.map(({ title, value, icon }, index) => (
              <Col className="coin-stats" key={index}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))
          }
        </Col>
      </Col>

      {/* Description */}
      <Col className="coin-desc-link">
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>What is {name}</Title>
          {HTMLReactParser(description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{name} Links</Title>
          {
            links.map((link, index) => (
              <Row className='coin-link' key={index}>
                <Title level={5} className='link-name'>{link.type}</Title>
                <a href={link.url} target="_blank" rel='noreferrer'>{link.name}</a>
              </Row>
            ))
          }
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails
