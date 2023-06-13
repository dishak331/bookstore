import { Form } from 'react-bootstrap';

const FormInput = (props) => {
  return (
    <>
      <Form.Group controlId={props.id}>
        <Form.Label className='font-italic'> {props.title}</Form.Label>
        <Form.Control
          as={props.as ? props.as : 'input'}
          required
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        >
          {/* {props.as == 'select' && <></>} */}
        </Form.Control>
      </Form.Group>
    </>
  );
};

export default FormInput;
