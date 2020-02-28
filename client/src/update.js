import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Input, Divider } from 'semantic-ui-react';
import axios from 'axios';

const Update = ({ customer, id, onSaved }) => {
    const [user, setUser] = useState({
        name: '',
        gmail: '',
        age: ''
    });
    const [onModalOpen, setOnModalOpen] = useState(false);

    const onOpen = () => {
        setUser(customer)
        setOnModalOpen(true)
    }

    const onSave = () => {
        if (user.name !== '' && user.gmail !== '' && user.age !== '') {
            axios.post(`/users/update/${id}`, user)
            .then((res) => {
                if (res.data === 'Updated') {
                    onSaved()
                }
            })
            setOnModalOpen(false)
        }
    }


    return (
        <Modal trigger={<Button color='black' onClick={onOpen}>Change</Button>} open={onModalOpen}>
    <Header content='Change' />
    <Modal.Content>
      <Input placeholder='name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value})}></Input>
      <Divider hidden></Divider>
      <Input placeholder='gmail' value={user.gmail} onChange={(e) => setUser({ ...user, gmail: e.target.value})}></Input>
      <Divider hidden></Divider>
      <Input placeholder='age' type='number' value={user.age} onChange={(e) => setUser({ ...user, age: parseInt(e.target.value)})}></Input>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={() => setOnModalOpen(false)}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green' onClick={onSave}>
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>
    )
}

export default Update;