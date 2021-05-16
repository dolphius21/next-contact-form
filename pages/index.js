import { useState } from 'react';
import Container from '../components/container';
import Form from '../components/form';
import Modal from '../components/modal';
import Header from '../components/header';

export default function Home() {
  const [modal, setModal] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} modal={modal} />}
      <Container>
        <Header />
        <Form setShowModal={setShowModal} setModal={setModal} />
      </Container>
    </>
  );
}
