import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, Label, Form, FormGroup, FormText, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter, Table } from 'reactstrap';

let block = [];

function Ver() {
    const [show, toggle] = useState(false);
    const [fshow, ftoggle] = useState(false);
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
            const response = await axios.post('http://localhost:5000/verify/qrcode', code);
            if(response.data.verification) {
                block = response.data.block;
                toggle(!show);
            }
            else {
                ftoggle(!fshow);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Modal isOpen = { fshow }>
                <ModalHeader  toggle = { () => { ftoggle(!fshow);  navigate('/')} }>
                    Product Not Verified
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
            <Modal isOpen = { show }>
                <ModalHeader  toggle = { () => { toggle(!show);  navigate('/')} }>
                    Product Verified
                </ModalHeader>
                <ModalBody>
                    <p className = 'lead'>Transaction Chain</p>
                        {block.map(element => {
                            return (element.entity === 'customer' ?
                                <div>
                                    <Card>
                                        <CardHeader>Customer</CardHeader>
                                        <CardBody>
                                            <Table>
                                                <tbody>
                                                <tr>
                                                    <th>Customer Name</th>
                                                    <td>{element.custName}</td>
                                                </tr> 
                                                <tr>
                                                    <th>Customer Location</th>
                                                    <td>{element.custLoc}</td>
                                                </tr>
                                                <tr>
                                                    <th>Customer ID</th>
                                                    <td>{element.custId}</td>
                                                </tr>
                                                <tr>
                                                    <th>Purchase Date</th>
                                                    <td>{element.date}</td>
                                                </tr>  
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </div>
                                : element.entity === 'retailer' ?
                                <div>
                                <Card>
                                    <CardHeader>Retailer</CardHeader>
                                    <CardBody>
                                        <Table>
                                            <tbody>
                                            <tr>
                                                <th>Retailer Name</th>
                                                <td>{element.retName}</td>
                                            </tr> 
                                            <tr>
                                                <th>Retailer Location</th>
                                                <td>{element.retLoc}</td>
                                            </tr> 
                                            <tr>
                                                <th>Retailer ID</th>
                                                <td>{element.retId}</td>
                                            </tr> 
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                                </div>
                                : element.entity === 'manufacturer' ?
                                <div>
                                <Card>
                                    <CardHeader>Manufacturer</CardHeader>
                                    <CardBody>
                                        <Table>
                                            <tbody>
                                            <tr>
                                                <th>Manufacturer Name</th>
                                                <td>{element.manufacturerName}</td>
                                            </tr> 
                                            <tr>
                                                <th>Manufacturer Location</th>
                                                <td>{element.manufacturerLoc}</td>
                                            </tr> 
                                            <tr>
                                                <th>Brand Name</th>
                                                <td>{element.brandName}</td>
                                            </tr>  
                                            <tr>
                                                <th>Model</th>
                                                <td>{element.model}</td>
                                            </tr>  
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </div>
                            : null
                         ) })}
                </ModalBody>
                <ModalFooter>
                    <Button color = 'primary' onClick = { () => { toggle(!show);  navigate('/')} }>Exit</Button>
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
        </div>
    )
}

export default Ver;