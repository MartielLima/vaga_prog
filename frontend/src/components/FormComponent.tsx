import { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

function FormComponent() {
  const [showForm, setShowForm] = useState(false);
  const [valueID, setValueID] = useState(0);
  const [valueDataCadastro, setValueDataCadastro] = useState("00/00/0000");
  const [valueTelefone, setValueTelefone] = useState("");
  const [valueValor, setValueValor] = useState("");

  return (
    <>
      <Form className={!showForm && "hidden"} style={{ marginBottom: "25px" }}>
        <h4>Editando Registro</h4>
        <div className="row mb-2">
          <div className="col-sm-2">
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" value={valueID} readOnly />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Data de Cadastro</Form.Label>
              <Form.Control type="text" value={valueDataCadastro} readOnly />
            </Form.Group>
          </div>
          <div className="col-sm-2">
            <Form.Group>
              <Form.Label>Valor (R$)</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setValueValor(e.target.value);
                }}
                value={valueValor}
              />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setValueTelefone(e.target.value);
                }}
                value={valueTelefone}
              />
            </Form.Group>
          </div>
          <div className="col-sm-2">
            <Button variant="success">Alterar</Button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default FormComponent;
