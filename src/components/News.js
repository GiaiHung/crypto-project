import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import moment from 'moment'
import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

const demoImage = "https://coinrevolution.com/wp-content/uploads/2022/07/bitcoin-3290060_1920-1024x664.jpg"

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12
  })
  const { data: crypto } = useGetCryptosQuery(50)

  if (!data?.value) return <Loader />

  return (
    <Row gutter={[24, 24]}>
      {
        !simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select your crypto'
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {crypto?.data?.coins.map((coin, index) => <Option key={index} value={coin.name}>{coin.name}</Option>)}
            </Select>
          </Col>
        )
      }
      {
        data.value.map((news, index) => {
          const {
            name,
            url,
            image,
            description,
            datePublished,
          } = news
          return (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card hoverable className='news-card'>
                <a href={url} target="_blank" rel='noreferrer'>
                  <div className="news-image-container">
                    <Title className='news-title' level={4}>{name.length > 60 ? `${name.substring(0, 50)}...` : name}</Title>
                    <img src={image?.thumbnail?.contentUrl || demoImage} alt={name} />
                  </div>
                  <p>
                    {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="icon" />
                      <Text className='provider-name'>{news.provider[0].name}</Text>
                    </div>
                    <Text>{moment(datePublished).startOf('hour').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
          )
        })
      }
    </Row>
  )
}

export default News
