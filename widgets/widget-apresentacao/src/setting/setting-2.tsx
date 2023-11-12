/* eslint-disable */
import { React } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'

const Setting = (props: AllWidgetSettingProps<any>) => {
  // Método para colocar na props do widget.tsx o id do mapview
  const onMapWidgetSelected = (useMapViewsId: string[]) => {
    props.onSettingChange(
      {
        id: props.id,
        useMapWidgetIds: useMapViewsId
      }
    )
  }

  return (
    <div>
      {/* Componente para pegar o ID do mapview do widget de mapa selecionado */}
      <MapWidgetSelector onSelect={onMapWidgetSelected} useMapWidgetIds={props.useMapWidgetIds} />
    </div>
  )
}

export default Setting
