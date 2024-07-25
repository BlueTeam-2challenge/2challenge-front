import { Card, Col, Container } from "react-bootstrap";
import './CardPage.css';
import { CardProps } from './types';

const CardPage = (props: CardProps) => {

  return (
    <div>
      <Container className="container">
        <Col sm
          className="mb-2"
        >
          <Card>
            <Card.Img
              className="card-icon"
              variant="top"
              src={props.icon}
              alt="icone-pata"
            />
            <Card.Body className="card-text">
              <Card.Title className="card-title">{props.title}</Card.Title>
              <Card.Text className="card-quantity"> {props.quantity} </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default CardPage;