import { Card, Col, Container } from "react-bootstrap";
import './CardPage.css';

const CardPage = () => {
  return (
    <div>
      <Container className="container">
        {/* arrumar o length para a quantidade de cards a serem usados */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col sm
            key={idx}
            className="mb-2"
          >
            {/* colocar as variaveis que para o card receber as informações de icone, titulo e quantidade */}
            <Card>
              {/* colocar a variavel do icone */}
              <Card.Img
                className="card-icon"
                variant="top"
                src="src\assets\images\icone-pata.png"
                alt="icone-pata"
              />
              <Card.Body className="card-text">
                {/* colocar a variavel do titulo e quantidade */}
                <Card.Title className="card-title">Animais</Card.Title>
                <Card.Text className="card-quantity"> 243 </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Container>
    </div>
  );
};

export default CardPage;