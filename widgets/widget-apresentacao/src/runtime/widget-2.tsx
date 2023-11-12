import { React, type AllWidgetProps } from 'jimu-core'
import { TextInput, TextArea, Icon } from 'jimu-ui'
import { Container, Row, Label, Button } from 'reactstrap'

const Widget = (props: AllWidgetProps<any>) => {
  return (
    // Adiciona Componentes de UI iniciais
    <div>
        <Container fluid >
        <Row className='justify-content-center'>
          <Container fluid className='text-center bg-primary'>
            <h1 className="text-light">Adicionar Evento</h1>
          </Container>
        </Row>
        <Row className='justify-content-center'>
          <Label>
            Título do Evento:
            <TextInput
              type='text'
            />
          </Label>
        </Row>
        <Row className='justify-content-center'>
          <Label>
            Descrição:
            <TextArea
            />
          </Label>
        </Row>
        <Row className='justify-content-center'>
          <Label>
            Data:
            <TextInput type="date"
            />
          </Label>
        </Row>
        <Row className='justify-content-center'>
          <Label>
            Imagem:
            <TextInput
            type="file" />
          </Label>
        </Row>
        <Row className='justify-content-center'>
          <Label>
          Adicionar Ponto:
            <Button aria-label="Button"
             icon size="default" >
              <Icon
                icon="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; fill=&quot;none&quot; viewBox=&quot;0 0 16 16&quot;><path fill=&quot;#000&quot; d=&quot;M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5Z&quot;></path></svg>"
                size="m"
              />
            </Button>
          </Label>
        </Row>
        <Row className='justify-content-center'>
          <Button className='btn btn-primary'
          >
            SalvarEvento
          </Button>
        </Row>
      </ Container>
    </div>

  )
}

export default Widget
