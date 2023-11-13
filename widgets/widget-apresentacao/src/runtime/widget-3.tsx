/* eslint-disable */
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { React, type AllWidgetProps } from 'jimu-core'
import { TextInput, TextArea, Icon } from 'jimu-ui'
import { Container, Row, Label, Button } from 'reactstrap'

const Widget = (props: AllWidgetProps<any>) => {
  // 2 - Cria State para salvar a view do mapa selecionado
  const [jmv, setJmv] = React.useState<JimuMapView>(null)
  const [objectId, setObjectId] = React.useState<string>('')

  // 3 - Metodo chamado quando a view o componente JimuMapViewComponent é alterado
  const activeChageViewHandler = (jmv: JimuMapView) => {

    // Salva a view Referente ao mapa selecionado no state jmv
    setJmv(jmv)

    // cria metodo a ser chamado ao view receber um evento de click
    jmv.view.on('click', (event) =>{
      mapViewClickHandler(event, jmv)
    } )
  }

  // 4 - Metodo chamado quando a view do mapa é clicada
  const mapViewClickHandler = (event, jmv: JimuMapView) => {
    // Pega as coordenadas do mapa onde foi clicado
    const coordinates = {
      x: event.x,
      y: event.y
    };
    // Faz um hitTest na view do mapa para pegar o objeto clicado
    jmv.view.hitTest(coordinates).then((result) => {
      // Pega ObjectID do ponto clicado
      const objectId = result.results[0].graphic.getObjectId() || null
      // Caso tenha sido clicado em um ponto
      setObjectId(objectId)
    });
  }

  return (
    <div>
      {/* 1 - Adiciona JimuMapViewComponent para pegar a view do mapa selecionado no setting.tsx*/}
      {
        props.useMapWidgetIds && props.useMapWidgetIds.length > 0 &&
        <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds[0]} onActiveViewChange={activeChageViewHandler} />
      }
      {/* apresenta o objectid apenas para mostrar que está pegando o dado do layer na view */}
      <div>
        <span>OBJECTID: { objectId }</span>
      </div>

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
          AdicionarPonto
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
