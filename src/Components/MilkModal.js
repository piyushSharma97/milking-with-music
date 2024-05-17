import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const MilkModal = ({
    showMilkModal,
    handleCloseMilkModal,
    setMilkQuantity,
    handleMilkConfirmation,
    milkQuantity
}) => {
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const validateQuantity = (value) => {
        const floatRegex = /^\d*(\.\d{0,3})?$/;
        if (floatRegex.test(value)) {
            setError('');
            setMilkQuantity(value);
            setIsValid(true);
        } else {
            setError('Please enter a valid number');
            setIsValid(false);
        }
    };

    useEffect(() => {
        validateQuantity(milkQuantity);
    }, [milkQuantity]);

    return (
        <>
            <Modal show={showMilkModal} onHide={handleCloseMilkModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Milk Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Enter milk quantity"
                        value={milkQuantity}
                        onChange={(e) => validateQuantity(e.target.value)}
                        isInvalid={!!error}
                    />
                    {error && <Form.Text className="text-danger">{error}</Form.Text>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMilkModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleMilkConfirmation} disabled={!isValid}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MilkModal;
