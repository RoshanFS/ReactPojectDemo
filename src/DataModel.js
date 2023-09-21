import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { GetDataRedux, clearContacts } from './ReduxService/ReduxActions';
import { useLocation, useNavigate } from 'react-router-dom';

const StartTimeOut = function (dispatch, routesParams, data, text) {
    setTimeout(() => {
        if (!data.APICall) {
            dispatch(clearContacts());
            if (routesParams.state === 'Modal A') {
                dispatch(GetDataRedux({ page: 1, companyId: 171, query: text }));
            } else {
                dispatch(GetDataRedux({ page: 1, companyId: 171, countryId: 226, query: text }));
            }
        }
    }, 500);
}

const Header = function ({ dispatch, navigate, routesParams }) {
    return (
        <ModalHeader toggle={() => {
            dispatch(clearContacts());
            navigate('/');
        }}>
            {routesParams.state}
        </ModalHeader>
    )
}

const TableRows = function () {
    return (
        <thead>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Country</th>
                <th>Phone Number</th>
            </tr>
        </thead>
    )
}

const RenderContacts = function ({
    filterContacts,
    data,
    setContactDetails,
    setIsDetailModalVisible,
    isDetailModalVisible
}) {
    return (
        <>
            {
                data?.Contacts?.total === null || data?.Contacts?.total === undefined ?
                    <tr >
                        <td colSpan={5} style={{ textAlign: 'center' }}>{"Network error, Please try again"}</td>
                    </tr> : data?.Contacts?.total === 0 ?
                        <tr >
                            <td colSpan={5} style={{ textAlign: 'center' }}>{"No data found, please try again"}</td>
                        </tr>
                        : filterContacts?.map((item, index) => {
                            return (
                                <tr key={item} onClick={() => {
                                    setContactDetails(data.Contacts.contacts[item]);
                                    setIsDetailModalVisible(!isDetailModalVisible);
                                }}>
                                    <td>{item}</td>
                                    <td>{data.Contacts.contacts[item].first_name}</td>
                                    <td>{data.Contacts.contacts[item].last_name}</td>
                                    <td>{data.Contacts.contacts[item].country.iso}</td>
                                    <td>{data.Contacts.contacts[item].phone_number}</td>
                                </tr>
                            )
                        })
            }
        </>
    )
}

export default function () {

    const [searchQuery, setSearchQuery] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [contactDetails, setContactDetails] = useState(null);
    const [isEvenContacts, setIsEvenContacts] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const routesParams = useLocation()

    const data = useSelector(state => state);
    const filterSelector = createSelector(
        state => state.Contacts?.ContactsIdsState,
        items => items?.map((item) => {
            if (isEvenContacts) {
                if (item % 2 === 0) {
                    return item;
                }
                return null;
            } else {
                return item;
            }
        }).filter((val) => val !== null)
    );
    const filterContacts = filterSelector(data);

    useEffect(() => {
        console.log("Ye data h bhai , ", data)
    }, [data]);

    useEffect(() => {
        const getInitialData = () => {
            if (routesParams.state === 'Modal A') {
                dispatch(GetDataRedux({ page: 1, noGroupDuplicates: 1, companyId: 171 }));
            } else {
                dispatch(GetDataRedux({ page: 1, companyId: 171, countryId: 226 }));
            }
        }
        getInitialData();
    }, [dispatch, routesParams.state]);

    useEffect(() => {
        console.log("routesParams.state : ", routesParams.state)
    }, [])

    const handleAboutToReachBottom = () => {
        if (data.Contacts && !data.APICallPagination && data.Contacts.total !== 0 && !(Math.ceil(data.Contacts.total / 20) === data.Contacts.page)) {
            let params = {
                page: data.Contacts.page + 1,
                companyId: 171,
                query: searchQuery
            }
            if (routesParams.state === 'Modal B') {
                params.countryId = 226
            }
            dispatch(GetDataRedux(params, true));
        }
    }

    const handleUpdate = (values) => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        const pad = 1;
        const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
        if (t > 1) handleAboutToReachBottom();
    }

    const onTextChange = (text) => {
        setSearchQuery(text);
        StartTimeOut(dispatch, routesParams, data, text)
    }

    const onSearchClick = () => {
        if (!data.APICall) {
            dispatch(clearContacts());
            if (routesParams.state === 'Modal A') {
                dispatch(GetDataRedux({ page: 1, companyId: 171, query: searchQuery }));
            } else {
                dispatch(GetDataRedux({ page: 1, companyId: 171, countryId: 226, query: searchQuery }));
            }
        }
    }
    const isModelA = () => routesParams.state === "Modal A"

    const getColor = () => isModelA() ? "#46139f" : "#ff7f50"

    return (
        <Modal isOpen size='xl'>
            <Header dispatch={dispatch} navigate={navigate} routesParams={routesParams} />
            <ModalBody>
                <Row>
                    <Col sm='12' md='4' className='d-flex justify-content-center'>
                        <Button className='btn btn-a' style={{
                            background: getColor()
                        }} onClick={() => {
                            if (routesParams.state === 'Modal B') {
                                dispatch(clearContacts());
                                navigate('/modalA', {
                                    state: 'Modal A'
                                });
                            }
                        }}>All Contacts</Button>
                    </Col>
                    <Col sm='12' md='4' className='d-flex justify-content-center'>
                        <Button className='btn btn-b' style={{
                            background: getColor()
                        }} onClick={() => {
                            if (routesParams.state === 'Modal A') {
                                dispatch(clearContacts());
                                navigate('/modalB', {
                                    state: 'Modal B'
                                });
                            }
                        }}>US Contacts</Button>
                    </Col>
                    <Col sm='12' md='4' className='d-flex justify-content-center'>
                        <Button className='btn btn-c border-2' style={{
                            background: "#46139f"
                        }} onClick={() => {
                            dispatch(clearContacts());
                            navigate('/');
                        }}>Close</Button>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col sm='12' md='11'>
                        <Input type='text' className='border-2 rounded' placeholder='Search Contacts...'
                            onChange={(event) => {
                                onTextChange(event.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    onSearchClick();
                                }
                            }} />
                    </Col>
                    <Col sm='12' md='1'>
                        <Button onClick={onSearchClick}>Search</Button>
                    </Col>
                </Row>
                <Scrollbars className='mt-3' autoHeight autoHeightMin={400} onUpdate={(values) => {
                    // console.log("Update ho raha hu bhai ")
                    handleUpdate(values)
                }}>
                    {
                        data.APICall ?
                            <div className='w-100 d-flex align-items-center justify-content-center'>
                                <Spinner />
                                {/* <h1>Hello</h1> */}
                            </div>
                            :
                            <Table striped>
                                <TableRows />
                                <tbody>
                                    <RenderContacts
                                        filterContacts={filterContacts}
                                        data={data}
                                        setContactDetails={setContactDetails}
                                        setIsDetailModalVisible={setIsDetailModalVisible}
                                        isDetailModalVisible={isDetailModalVisible}
                                    />
                                    {
                                        data.APICallPagination &&
                                        <tr>
                                            <td colSpan={5} className='text-center'>
                                                <Spinner />
                                                {/* <h1>Hello 3d</h1> */}

                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                    }
                </Scrollbars>
            </ModalBody>
            <ModalFooter className='d-flex justify-content-start ml-5'>
                <Label check>
                    <Input type="checkbox" value={isEvenContacts} onChange={() => setIsEvenContacts(!isEvenContacts)} />{' '}
                    Only even
                </Label>
            </ModalFooter>
            {/* Detail modal */}
            <Modal isOpen={isDetailModalVisible}>
                <ModalHeader toggle={() => {
                    setContactDetails(null);
                    setIsDetailModalVisible(!isDetailModalVisible);
                }}>
                    Modal C
                </ModalHeader>
                <ModalBody>
                    {
                        contactDetails &&
                        <ul>
                            <li>{contactDetails.first_name}</li>
                            <li>{contactDetails.last_name}</li>
                            <li>{contactDetails.country.iso}</li>
                            <li>{contactDetails.phone_number}</li>
                        </ul>
                    }
                </ModalBody>
            </Modal>
        </Modal >
    )
}