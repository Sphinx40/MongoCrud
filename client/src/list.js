import React, { Fragment, useEffect, useState } from 'react';
import { Segment, Table, Header, Input, Container, Button, Form, Dropdown, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import Update from './update';
import { injectIntl } from 'react-intl';
import { LOCALES } from './language';
import { connect } from 'react-redux';
import { lang } from './action';

const List = (props) => {
    const {
        intl: { messages },
        lang,
        language
    } = props;
    const [customers, setCustomers] = useState([]);
    const [user, setUser] = useState({
        name: '',
        gmail: '',
        age: ''
    })
    const options = [
        { key: 1, text: 'en', value: LOCALES.ENGLISH },
        { key: 2, text: 'ru', value: LOCALES.RUSSIAN }
    ]

    useEffect(() => {
        getUsers()
    }, [])

 
    const getUsers = () => {
        axios.get('/users/')
            .then((res) => {
                setCustomers(res.data)
            })
    }

    const onAddUser = () => {
        if (user.name !== '' && user.gmail !== '' && user.age !== '') {
            axios.post('/users/add', user)
                .then((res) => {
                    if (res.data === 'User added!') {
                        getUsers()
                        setUser({
                            name: '',
                            gmail: '',
                            age: ''
                        })
                    }
                })
        }
    }

    const onChangeUser = (text, e) => {
        setUser(item => {
            let t = { ...item }
            switch (text) {
                case 'Name':
                    t.name = e;
                    break;
                case 'Gmail':
                    t.gmail = e;
                    break;
                case 'Age':
                    t.age = parseInt(e);
                    break;
                default:
                    return t;
            }
            return t;
        })
    }

    const deleteUser = (id) => {
        axios.delete(`/users/${id}`)
            .then((res) => {
                if (res.data === 'Exercise deleted.') {
                    getUsers()
                }
            })
    }

    const onChangeLang = (e, { value }) => {
        lang(value)
    }

    return (
        <Fragment>
            <Container style={{ marginTop: 40 }}>
                <Dropdown
                    selection
                    options={options}
                    onChange={onChangeLang}
                    placeholder='Choose an option'
                    defaultValue={language}
                />
                <Divider hidden />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            value={user.name}
                            label={messages['name']}
                            placeholder='name'
                            onChange={(e) => onChangeUser('Name', e.target.value)}
                        />
                        <Form.Field
                            control={Input}
                            value={user.gmail}
                            label={messages['gmail']}
                            placeholder='gmail'
                            onChange={(e) => onChangeUser('Gmail', e.target.value)}
                        />
                        <Form.Field
                            control={Input}
                            type='number'
                            value={user.age}
                            label='Age'
                            placeholder='age'
                            onChange={(e) => onChangeUser('Age', e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Button color='blue' onClick={onAddUser} fluid>{messages['add']}</Button>
                <Segment>
                    <Table basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Age</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {customers.map((item, id) => (
                                <Table.Row key={id}>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                {item.name}
                                                <Header.Subheader>{item.gmail}</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{item.age}</Table.Cell>
                                    <Table.Cell><Button color='red' icon='trash' onClick={() => deleteUser(item._id)}></Button> <Update customer={item} id={item._id} onSaved={() => getUsers()} /></Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Segment></Container>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.lang
    }
}

export default connect(mapStateToProps, {
    lang
})(injectIntl(List));
