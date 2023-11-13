/* disable-eslint */
import { AllDataSourceTypes, Immutable, React, type UseDataSource } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'

const Setting = (props: AllWidgetSettingProps<any>) => {
  const onMapWidgetSelected = (useMapViewsId: string[]) => {
    props.onSettingChange(
      {
        id: props.id,
        useMapWidgetIds: useMapViewsId
      }
    )
  }

  // 2 - Metodo para salvar o Data Source selecionado no props do widget.tsx
  const onDataSourceChange = (useDataSource: UseDataSource[]) => {
    props.onSettingChange(
      {
        id: props.id,
        useDataSourcesEnabled: true,
        useDataSources: useDataSource
      }
    )
  }

  return (
    <div>
      <MapWidgetSelector onSelect={onMapWidgetSelected} useMapWidgetIds={props.useMapWidgetIds} />

      {/* 1 - Adiciona componente para apontar o Data Source que será utilizado para pegar os dados da feature */}

      <DataSourceSelector
        types={Immutable([AllDataSourceTypes.FeatureLayer])}
        useDataSources={props.useDataSources}
        useDataSourcesEnabled={props.useDataSourcesEnabled}
        onChange={onDataSourceChange}
        widgetId={props.id}
        mustUseDataSource={true}
      />

    </div>
  )
}

export default Setting
