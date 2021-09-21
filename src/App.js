import axios from 'axios'
import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import ImageComponent from './components/ImageComponent'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [imageData, setImageData] = useState([])

  const [currentDate, setCurrentDate] = useState(moment())

  const [loading, setLoading] = useState(true)

  //storing NASA's APOD API url
  const apiUrl = 'https://api.nasa.gov/planetary/apod'

  //pulling in custom API key
  const apiKey = process.env.REACT_APP_NASA_API_KEY

  //extracting data from APOD API and assigning to state
  const fetchData = async () => {
    try {
      const endDate = currentDate.format('YYYY-MM-DD')
      const startDate = currentDate.subtract(7,'d').format('YYYY-MM-DD')

      const { data } = await axios.get(`${apiUrl}?api_key=${apiKey}&end_date=${endDate}&start_date=${startDate}`)

      const receivedData = data.map((dailyData) => ({
        date: dailyData.date,
        explanation: dailyData.explanation,
        media_type: dailyData.media_type,
        title: dailyData.title,
        url: dailyData.url,
      }))

      return receivedData
    } catch (error) {
      console.log(error)
    }
  }

  //calling fetchData on page load
  useEffect(() => {
    const fetchEventData = async () => {
      const fetchedData = await fetchData()

      setImageData(fetchedData)
      console.log(fetchedData)

      setLoading(false)
    }

    fetchEventData()
  }, [])


  return (
    <>
      <main className='py-3'>
        <Container>
          <Header />
          {loading ? (<Loader />) : 
          <Row>
            {imageData.map((image) => (
              <Col key={image.date} md={6}>
                  <ImageComponent data={image} />
              </Col>
            ))}
          </Row>}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
