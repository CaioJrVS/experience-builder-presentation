/* eslint-disable */
import { type JimuMapView, JimuMapViewComponent, FeatureLayerDataSource } from 'jimu-arcgis'
import { React, type AllWidgetProps, DataSourceComponent, DataSource, FeatureLayerQueryParams } from 'jimu-core'
import { TextInput, TextArea, Icon } from 'jimu-ui'
import { Container, Row, Label, Button } from 'reactstrap'
import { useEffect } from 'react'
import Draw from '@arcgis/core/views/draw/Draw'
import Graphic from '@arcgis/core/Graphic'
import Symbol from '@arcgis/core/symbols/Symbol'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

const Widget = (props: AllWidgetProps<any>) => {
  const [jmv, setJmv] = React.useState<JimuMapView>(null)
  const [objectId, setObjectId] = React.useState<number>(null)

  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [date, setDate] = React.useState<string>('')
  const [file, setFile] = React.useState<string>('')
  const [image, setImage] = React.useState<string>('')

  // 4 - State para armazenar o ponto criado no mapa
  const [graphic, setGraphic] = React.useState<Graphic>(null)

  const [dataSource, setDataSource] = React.useState<DataSource>(null)

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

  useEffect(() =>{
    const record = dataSource?.getRecords().find((record) => record.getData()['objectid'] === objectId) || null
    if (!record) {
      return
    }
    setEventData(record.getData())
  }, [objectId])

  const setEventData = (recordData) =>{
    setTitle(recordData['titulo'])
    setDescription(recordData['descricao'])
    setDate(formatDate(recordData['data']))
  }
  
  const formatDate = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const renderData = (ds: DataSource) => {
    setDataSource(ds)

    return <></>
  }

  // 2 - Inicia processo de criação de ponto no mapa (visual)
  const enableCreatePoint= (event): void => {
    // Objeto para desenhar no mapa
    const draw = new Draw({
      view: jmv.view
    });

    // Inicia a criação do ponto
    const action = draw.create("point");

    // Eventos para atulizar o desenho do ponto no mapa
    action.on("cursor-update", function (evt) {
      createPointGraphic(evt.coordinates);
    });
    action.on("draw-complete", function (evt) {
      createPointGraphic(evt.coordinates);
    });
  }
  
  // 3 - Método para salvar o ponto criado no mapa
  const createPointGraphic = (coordinates) => {
    jmv.view.graphics.removeAll();
    const point = {
      type: "point",
      x: coordinates[0],
      y: coordinates[1],
      spatialReference: jmv.view.spatialReference
    };

    const graphic = new Graphic({
      geometry: point,
    });
    
    const symbol = new SimpleMarkerSymbol({
      style:  'cross',
    });

    graphic.symbol = symbol;

    jmv.view.graphics.add(graphic);
    setGraphic(graphic);
  }


  // 5 - Método para salvar o evento na Feature Layer
  const addNewEvent= (): void => {
    const featureLayerDataSource = dataSource as FeatureLayerDataSource;

    const featureLayer: FeatureLayer = new FeatureLayer({
      url: featureLayerDataSource.url
    });

    const attributes = {
      titulo: title,
      descricao: description,
      data: dateToTimestamp(date),
    };

    const graphicToAdd = new Graphic({
      geometry: graphic.geometry,
      attributes: attributes,
    });

    featureLayer.applyEdits({
      addFeatures: [graphicToAdd]
    }).then(() => {
      jmv.view.graphics.removeAll();

      setQuery(state => ({
          ...state,
        }))

    }).catch((err) => {
      console.log(err)
    })
  }

  const dateToTimestamp = (date: string) => {
    return new Date(date).getTime()
  }

  return (
    <div>
      {
        props.useMapWidgetIds && props.useMapWidgetIds.length > 0 &&
        <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds[0]} onActiveViewChange={activeChageViewHandler} />
      }
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
              value = {title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Label>
        </Row>
        <Row className='justify-content-center'>
          <Label>
            Descrição:
            <TextArea
              value = {description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Label>
        </Row>
        <Row className='justify-content-center'>
          <Label>
            Data:
            <TextInput type="date"
              value = {date}
              onChange={(e)=> setDate(e.target.value)}
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
        {/*  1 - Ao Clicar no botão de adicionar ponto
            Inicia o draw do ponto no mapa
        */}
        <Row className='justify-content-center'>
          <Label>
          Adicionar Ponto
            <Button aria-label="Button"
             icon size="default" 
             onClick={enableCreatePoint}
             >
              <Icon
                icon="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; fill=&quot;none&quot; viewBox=&quot;0 0 16 16&quot;><path fill=&quot;#000&quot; d=&quot;M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5Z&quot;></path></svg>"
                size="m"
              />
            </Button>
          </Label>
        </Row>
        {/* 
            4 - Ao clicar no botão de salvar evento
            Salva o evento na Feature Layer
        */}
        <Row className='justify-content-center'>
          <Button className='btn btn-primary'
            onClick={addNewEvent}
          >
            SalvarEvento
          </Button>
        </Row>
      </ Container>
    </div>

  )
}

export default Widget
