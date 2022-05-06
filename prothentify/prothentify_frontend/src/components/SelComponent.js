import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardHeader, Label, Form, FormGroup, FormText, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function Sel() {
    const [show, toggle] = useState(false);
    const [fshow, ftoggle] = useState(false);
    const [en, change] = useState('');
    let qrCode;
    const navigate = useNavigate();
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const handleCode = (evt) => {
        qrCode =  evt.target.files[0];
    }
    const handleForm = async(evt) => {
        try{
            evt.preventDefault();
            const base64 = await convertBase64(qrCode);
            const code = {
                qrCode: base64
            }
            const response = await axios.post('http://localhost:5000/seller/qrcode', code);
            if(response.data.verification) {
                change(response.data.en);
                toggle(!show);
            }
            else {
                ftoggle(!show);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <Container>
            <Modal isOpen = { show }>
                <ModalHeader  toggle = { () => { toggle(!show);  navigate('/')} }>
                    QR Code Verified
                </ModalHeader>
                <ModalBody>
                <Row>
                    <Col className = 'd-flex justify-content-center'>
                        <Button color = 'warning' onClick = { () => { toggle(!show);  navigate('/retailer-customer', { state:{ en: en, retailer: true,  customer: false } }) } }>Sell to Retailer</Button>
                    </Col>
                    <Col className = 'd-flex justify-content-center'>
                        <Button color = 'success' onClick = { () => { toggle(!show);  navigate('/retailer-customer', { state:{ en: en, retailer: false,  customer: true } }) } }>Sell to Customer</Button>
                    </Col>
                </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color = 'primary' onClick = { () => { toggle(!show);  navigate('/')} }>Exit</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen = { fshow }>
                <ModalHeader  toggle = { () => { ftoggle(!fshow);  navigate('/')} }>
                    QR Code Not Verified
                </ModalHeader>
                <ModalBody>
                <Row>
                    <p>Invalid QR Code, product may not be genuine.</p>
                </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color = 'primary' onClick = { () => { toggle(!fshow);  navigate('/')} }>Exit</Button>
                </ModalFooter>
            </Modal>
            <Row className='justify-content-center'>
                <Col sm = {6}>
                    <Card>
                        <CardHeader>
                            QR Code Verification
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit = { handleForm }>
                            <FormGroup>
                                <Label for = "qrCode">
                                    File
                                </Label>
                                <Input id = "qrCode" name = "file" type = "file" onChange = { handleCode }/>
                                <FormText>
                                    Upload QR Code scanned from the product.
                                </FormText>
                            </FormGroup>
                            <Row className='justify-content-center'>
                                    <Col sm = {4}>
                                        <Button type = 'submit' color = 'primary'>
                                            Verify QR Code
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

export default Sel;