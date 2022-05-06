import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Label, Input, Col, Row, Button, Container, Card, CardHeader, CardBody, FormGroup, Modal, ModalBody, ModalHeader, Media, ModalFooter } from 'reactstrap';

function Man() {
    const [show, toggle] = useState(false);
    const [qrCode, update] = useState('');
    const navigate = useNavigate();
    const handleForm = async(evt) => {
        evt.preventDefault();
        const product = {
            'entity': 'manufacturer',
            'brandName': evt.target.brandName.value,
            'model': evt.target.model.value,
            'description': evt.target.description.value,
            'manufacturerName': evt.target.manufacturerName.value,
            'manufacturerLoc': evt.target.manufacturerLocation.value,
            'timestamp': new Date().toISOString()
        }
        try {
            const response = await axios.post('http://localhost:5000/manufacturer/product-details', product)
            update(response.data.code);
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
                    QR Code Generated
                </ModalHeader>
                <ModalBody>
                    <Media>
                        <Row className='align-items-center'>
                            <Col>
                                <Media middle>
                                    <Media object src = {qrCode}/>
                                </Media>
                            </Col>
                            <Col>
                                <Media body>
                                    <Media heading>Secure QR Code</Media>
                                </Media>
                            </Col>
                        </Row>
                    </Media>
                </ModalBody>
                <ModalFooter>
                    <a href = { qrCode.toString() } download = "qrcode.png">
                        <Button color = 'primary'>Save QR Code</Button>
                    </a>
                </ModalFooter>
            </Modal>
            <Row className='justify-content-center'>
                <Col sm = {8}>
                    <Card>
                        <CardHeader>
                            Product Registration
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit = { handleForm }>
                                <FormGroup>
                                    <Row>
                                        <Label for = 'brandName' sm = {4}>Brand Name</Label>
                                        <Col sm = {8}>
                                            <Input type = 'text' id = 'brandName'></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Label for = 'model' sm = {4}>Model</Label>
                                        <Col sm = {8}>
                                            <Input type = 'text' id = 'model'></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Label for = 'description' sm = {4}>Description</Label>
                                        <Col sm = {8}>
                                            <Input type = 'textarea' id = 'description'></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Label for = 'manufacturerName' sm = {4}>Manufacturer Name</Label>
                                        <Col sm = {8}>
                                            <Input type = 'text' id = 'manufacturerName'></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Label for = 'manufacturerLocation' sm = {4}>Manufacturer Location</Label>
                                        <Col sm = {8}>
                                            <Input type = 'text' id = 'manufacturerLocation'></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <Row className='justify-content-center'>
                                    <Col className = 'd-flex justify-content-center' sm = {3}>
                                        <Button type = 'submit' color = 'primary'>
                                            Add Product
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

export default Man;