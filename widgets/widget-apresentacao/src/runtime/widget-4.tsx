/* eslint-disable */
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { React, type AllWidgetProps, DataSourceComponent, DataSource, FeatureLayerQueryParams } from 'jimu-core'
import { TextInput, TextArea, Icon } from 'jimu-ui'
import { Container, Row, Label, Button } from 'reactstrap'
import { useEffect } from 'react'

const Widget = (props: AllWidgetProps<any>) => {
  const [jmv, setJmv] = React.useState<JimuMapView>(null)
  const [objectId, setObjectId] = React.useState<number>(null)

  // 4 - Armazena o DataSource da layer selecionada para ter acesso aos dados
  const [dataSource, setDataSource] = React.useState<DataSource>(null)

  // 2 - Inicialmente o coponente de DataSource vem vazio
  // Ele espera que uma query para então carregar os dados
  const [query, setQuery] = React.useState<FeatureLayerQueryParams>({
    where: '1=1',
    outFields: ['*'],
  })

  const activeChageViewHandler = (jmv: JimuMapView) => {
    setJmv(jmv)
    jmv.view.on('click', (event) =>{
      mapViewClickHandler(event, jmv)
    } )

  }

  const mapViewClickHandler = (event, jmv: JimuMapView) => {
    const coordinates = {
      x: event.x,
      y: event.y
    };
    jmv.view.hitTest(coordinates).then((result) => {
      const objectId = result.results[0].graphic.getObjectId() || null
      if (!objectId) {
        return
      }
      setObjectId(objectId)
    });
  }

  // 5 - cria um hook que é executado toda vez que o objectId é alterado
  useEffect(() =>{
    const record = dataSource?.getRecords().find((record) => record.getData()['objectid'] === objectId) || null
    if (!record) {
      return
    }
    setEventData(record.getData())
  }, [objectId])

  // 6 - Próximo passo: pegar os dados da feature clicada e carregar nos inputs
  const setEventData = (recordData) =>{
    return
  }
  
  // 3 - Componente de DataSource espera uma child function para renderizar os dados
  const renderData = (ds: DataSource) => {
    setDataSource(ds)

    return <></>
  }

  return (
    <div>
      {
        props.useMapWidgetIds && props.useMapWidgetIds.length > 0 &&
        <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds[0]} onActiveViewChange={activeChageViewHandler} />
      }

      {/* 1 - Componente do DataSource para ter acesso aos dados da layer selecionada */}
      {
        props.useDataSourcesEnabled && props.useDataSources && props.useDataSources.length > 0 &&
        <DataSourceComponent useDataSource={props.useDataSources[0]}
          widgetId={props.id} query={query}
        >
          {renderData}
        </DataSourceComponent>
      }

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
          Adicionar Ponto
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
