import { Card, Col, Container, Row } from "react-bootstrap";

const CardPage = () => {
  return (
    <div className="container-card">
      <Container fluid>
        {/* arrumar o length para a quantidade de cards a serem usados */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <Row
            key={idx}
            style={{ border: '3px solid black', width: '14em' }}
            className="mb-2"
          >
            {/* colocar as variaveis que para o card receber as informações de icone, titulo e quantidade */}
            <Card>
              {/* colocar a variavel do icone */}
              <Card.Img
                variant="top"
                src="src\assets\images\icone-pata.png"
                alt="icone-pata"
              />
              <Card.Body>
                {/* colocar a variavel do titulo e quantidade */}
                <Card.Title className="card-title">Animais</Card.Title>
                <Card.Text className="card-quantity"> 243 </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default CardPage;