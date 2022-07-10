import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Row, Col, Input, Card } from 'antd'
import millify from 'millify'
import Loader from './Loader'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 50
  const { data, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  }, [searchTerm, data?.data?.coins])

  if (isFetching) return <Loader />

  return (
    <>
      {!simplified && <div className='search-crypto'>
        <Input
          placeholder='Search...'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>}
      <Row className='crypto-card-container' gutter={[32, 32]}>
        {
          cryptos?.map((crypto) => {
            const { uuid: id, name, rank, iconUrl: img, price, marketCap, change } = crypto
            return (
              <Link to={`/crypto/${id}`} key={id}>
                <Col className='crypto-card' xs={24} sm={12} lg={6}>
                  <Card
                    title={`${rank}. ${name.substring(0, 14)}`}
                    extra={<img className='crypto-image' src={img} alt={name} />}
                    hoverable
                  >
                    <p>Price: {millify(price)}</p>
                    <p>Market Cap: {millify(marketCap)}</p>
                    <p>Daily Change: {millify(change)}%</p>
                  </Card>
                </Col>
              </Link>
            )
          })
        }
      </Row>
    </>
  )
}

export default Cryptocurrencies
