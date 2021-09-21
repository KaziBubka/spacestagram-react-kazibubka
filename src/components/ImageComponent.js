import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Col, Row, Card, Button } from 'react-bootstrap'

const ImageComponent = ({ data: { date, explanation, media_type, title, url } }) => {

    const [isLiked, setIsLiked] = useState(false)
    const [likeId, setLikeId] = useState([])

    const toggleLike = () => {
        
        if(!isLiked) {
            //if not already liked, add like
            setIsLiked(true)
            localStorage.setItem('isLiked', true)
            //adding like ID to local storage
            setLikeId(date.toString())
            localStorage.setItem('likeId', likeId)
        } else {
            //if already liked, remove like
            setIsLiked(false)
            localStorage.setItem('isLiked', false)
            setLikeId(date.toString())
            localStorage.setItem('likeId', likeId)
        }
    }

    //checking if any pictures were liked on page load
    useEffect(() => {
        const checkLike = localStorage.getItem('isLiked') === 'true'
        setIsLiked(checkLike)
    }, [])

    return (
        <>
        <Container>
            <Row>
                <Col>
                <Card>
                    <Card.Img src={url} alt={title} style={{minHeight: '300px'}}/>
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center'}}>{title}</Card.Title>
                        <Card.Title style={{textAlign: 'center', fontSize: '1.1rem'}}>{date}</Card.Title>
                        <Card.Text>{explanation}</Card.Text>
                        { likeId && isLiked ? <Button variant="danger" onClick={toggleLike}>Liked</Button> : <Button variant="outline-dark" onClick={toggleLike} id={date}>Like</Button>}
                    </Card.Body>
                </Card>
                </Col>                
            </Row>
        </Container>
        </>
    )
}

export default ImageComponent
