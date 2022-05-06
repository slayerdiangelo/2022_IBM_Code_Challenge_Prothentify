import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './stylesheets.css';
import { Container, Row, Col, Card, CardText, CardTitle, Button, CardImg } from 'reactstrap';

class Intro extends Component {
    render() {
        return (
          <div>
            <Container fluid> 
              <div className = 'jumbo p-5 rounded-lg'>         
                <h1 className = 'display-4'>Prothentify</h1>
                <p className = 'lead'>Produce and Sell Genuine Products</p>
              </div>
            </Container>
            <Container>
              <Row className = 'justify-content-center'>
                <Col>
                  <Card>
                    <div className = 'card-content'>
                      <CardImg src = '../../images/man.jpg' />
                      <CardTitle>
                        <p className = 'lead'>Manufacturer</p>
                      </CardTitle>
                      <CardText>
                        Add in new product details
                      </CardText>
                      <Link to = '/manufacturer'>
                        <Button outline = {true} color = 'primary'>
                          Product Registration
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
                <Col>
                  <Card>
                  <div className = 'card-content'>
                    <CardImg src = '../../images/ret.jpg' />
                      <CardTitle>
                        <p className = 'lead'>Manufacturer/Retailer</p>
                      </CardTitle>
                      <CardText>
                        Sell products to a retailer or customer
                      </CardText>
                      <Link to = '/sell-product'>
                        <Button outline = {true} color = 'secondary'>
                        Sell
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
                <Col>
                  <Card>
                  <div className = 'card-content'>
                    <CardImg src = '../../images/cust.jpg' />
                      <CardTitle>
                        <p className = 'lead'>Customer</p>
                      </CardTitle>
                      <CardText>
                        Verify Product
                      </CardText>
                      <Link to = '/verify'>
                        <Button outline = {true} color = 'success'>
                          Verify
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        )
    }
}
export default Intro;