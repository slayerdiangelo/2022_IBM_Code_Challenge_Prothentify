import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Label, Input, Col, Row, Button, Container, Card, CardHeader, CardBody, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function RC() {
    const  { state } = useLocation()
    const [show, toggle] = useState(false);
    const navigate = useNavigate();
    if(state.retailer) {
        const handleForm = async(evt) => {
            evt.preventDefault();
            const obj = {
                entity: {
                'entity': 'retailer',
                'retName': evt.target.retName.value,
                'retId': evt.target.retId.value,
                'description': evt.target.description.value,
                'retLoc': evt.target.retLocation.value,
                'timestamp': new Date().toISOString()
                },
                en: state.en
            }
            try {
                await axios.post('http://localhost:5000/seller/retailer-customer', obj)
                toggle(!show);
            }
            catch(err) {
                console.log(err)
            }
        }
        return (
            <Container>
                <Modal isOpen = { show }>
                    <ModalHeader  toggle = { () => { toggle(!show);  navigate('/')} }>
                        Transaction Added Successfully
                    </ModalHeader>
                    <ModalBody>
                    <Row>
                        <p>
                            New Retailer Transaction IPFS block added to the chain.
                        </p>
                    </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color = 'primary' onClick = { () => { toggle(!show);  navigate('/')} }>Exit</Button>
                    </ModalFooter>
                </Modal>
                <Row className='justify-content-center'>
                    <Col sm = {8}>
                        <Card>
                            <CardHeader>
                                Retailer Registration
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit = { handleForm }>
                                    <FormGroup>
                                        <Row>
                                            <Label for = 'retName' sm = {4}>Retailer Name</Label>
                                            <Col sm = {8}>
                                                <Input type = 'text' id = 'retName'></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Label for = 'retId' sm = {4}>Retailer ID</Label>
                                            <Col sm = {8}>
                                                <Input type = 'text' id = 'retId'></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Label for = 'description' sm = {4}>Retailer Description</Label>
                                            <Col sm = {8}>
                                                <Input type = 'textarea' id = 'description'></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Label for = 'retLocation' sm = {4}>Retailer Location</Label>
                                            <Col sm = {8}>
                                                <Input type = 'text' id = 'retLocation'></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <Row className='justify-content-center'>
                                        <Col className = 'd-flex justify-content-center' sm = {4} >
                                            <Button type = 'submit' color = 'primary'>
                                                Sell to Retailer
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        const handleForm = async(evt) => {
            evt.preventDefault();
            const obj = {
                entity: {
                'entity': 'customer',
                'custName': evt.target.custName.value,
                'custId': evt.target.custId.value,
                'date': evt.target.date.value,
                'custLoc': evt.target.custLocation.value,
                'timestamp': new Date().toISOString()
                },
                en: state.en
            }
            try {
                await axios.post('http://localhost:5000/seller/retailer-customer', obj)
                toggle(!show);
            }
            catch(err) {
                console.log(err)
            }
        }
        return (
            <Container>
                <Modal isOpen = { show }>
                    <ModalHeader  toggle = { () => { toggle(!show);  navigate('/')} }>
                        Transaction Added Successfully
                    </ModalHeader>
                    <ModalBody>
                    <Row>
                        <p>
                            New Customer Transaction IPFS block added to the chain.
                        </p>
                    </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color = 'primary' onClick = { () => { toggle(!show);  navigate('/')} }>Exit</Button>
                    </ModalFooter>
                </Modal>
                <Row className='justify-content-center'>
                    <Col sm = {8}>
                        <Card>
                            <CardHeader>
                                Customer Registration
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit = { handleForm }>
                                    <FormGroup>
                                        <Row>
                                            <Label for = 'custName' sm = {4}>Customer Name</Label>
                                            <Col sm = {8}>
                                                <Input type = 'text' id = 'custName'></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Label for = 'custId' sm = {4}>Customer ID</Label>
                                            <Col sm = {8}>
                                                <Input type = 'text' id = 'custId'></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Label for = 'date' sm = {4}>Purchase Date</Label>
                                            <Col sm = {8}>
                                                <Input type = 'text' id = 'date'></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Label for = 'custLocation' sm = {4}>Customer Location</Label>
                                            <Col sm = {8}>
                                                <Input type = 'text' id = 'custLocation'></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <Row className='justify-content-center'>
                                        <Col className = 'd-flex justify-content-center' sm = {4} >
                                            <Button type = 'submit' color = 'primary'>
                                                Sell to Customer
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default RC;