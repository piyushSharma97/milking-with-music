import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const MilkModal =({
    showMilkModal,handleCloseMilkModal,setMilkQuantity ,handleMilkConfirmation,milkQuantity
})=>{


    return(
        <>
          <Modal show={showMilkModal} onHide={handleCloseMilkModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Milk Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" placeholder="Enter milk quantity" value={milkQuantity} onChange={(e) => setMilkQuantity(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMilkModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleMilkConfirmation}>Save</Button>
                </Modal.Footer>
            </Modal>
        
        </>
    )
}

export default MilkModal