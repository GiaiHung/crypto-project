import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Typography, Avatar } from 'antd'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'

const NavBar = () => {
    const [activeMenu, setActiveMenu] = useState(false)
    const [screenSize, setScreenSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div className='nav-container'>
            <div className="logo-container">
                <Avatar src={icon} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
                {screenSize < 768 && <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>}
            </div>
            {activeMenu && <Menu theme="dark">
                <Menu.Item key={1} icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key={2} icon={<FundOutlined />}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item key={3} icon={<MoneyCollectOutlined />}>
                    <Link to="/globalstats">Global Stats</Link>
                </Menu.Item>
                <Menu.Item key={4} icon={<BulbOutlined />}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>}
        </div>
    )
}

export default NavBar
