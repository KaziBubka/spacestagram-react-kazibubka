import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap'
import NasaLogo from '../static/nasa_logo.png'


const Header = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={1}>
                    <Image src={NasaLogo} style={{maxWidth: '100px'}}/>
                    </Col>
                    <Col md={11}>
                    <h1>Spacestagram</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h5>Powered by NASA's Astronomy Photo of the Day API</h5>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Header
