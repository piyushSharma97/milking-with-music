import { useCallback, useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';

interface MilkModalProps {
  showMilkModal: boolean;
  handleCloseMilkModal: () => void;
  setMilkQuantity: Dispatch<SetStateAction<string>>;
  handleMilkConfirmation: () => void;
  milkQuantity: string;
  submissionError: string | null;
}

/** Collects and validates the milk quantity before saving a session. */
const MilkModal = ({
  showMilkModal,
  handleCloseMilkModal,
  setMilkQuantity,
  handleMilkConfirmation,
  milkQuantity,
  submissionError,
}: MilkModalProps): JSX.Element => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  /** Validates the input and updates the form's visible error state. */
  const validateQuantity = useCallback((value: string): void => {
    const floatRegex = /^\d*(\.\d{0,3})?$/;
    if (floatRegex.test(value)) {
      setError('');
      setMilkQuantity(value);
      setIsValid(true);
    } else {
      setError('Please enter a valid number');
      setIsValid(false);
    }
  }, [setMilkQuantity]);

  useEffect(() => {
    validateQuantity(milkQuantity);
  }, [milkQuantity, validateQuantity]);

  /** Validates an input change before forwarding it to the parent state. */
  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    validateQuantity(event.target.value);
  };

  return (
    <Modal show={showMilkModal} onHide={handleCloseMilkModal}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Milk Quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submissionError && <Alert variant="danger" role="alert">{submissionError}</Alert>}
        <Form.Control
          type="text"
          placeholder="Enter milk quantity"
          aria-label="Milk quantity"
          value={milkQuantity}
          onChange={handleQuantityChange}
          isInvalid={!!error}
          aria-describedby={error ? 'milk-quantity-error' : undefined}
        />
        {error && <Form.Text id="milk-quantity-error" className="text-danger" role="alert">{error}</Form.Text>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseMilkModal}>Cancel</Button>
        <Button variant="primary" onClick={handleMilkConfirmation} disabled={!isValid}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MilkModal;
