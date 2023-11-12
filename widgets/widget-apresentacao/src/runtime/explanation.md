## Ordem de alteração no Widget Customizado

#### INICIO: 
- Adicionar Widget de Mapa no Experience Builder
- Criar pastas e arquivos do Widget Customizado

### Widget-1 (Inicia o Widget.tsx)
- Cria componente inicial do Widget

### Widget-2 (Adiciona UI)
- Adiciona componentes da UI

### Setting-1 (Inicia o Setting.tsx)
- Cria componente inicial de configuração
- Adicionar config.json no srd do widget

### Setting-2 e Widget-3 (Integra o Widget de Mapa com o Widget Customizado)
- Adicionar componente de seleção de mapa no Setting.tsx
- Adicionar componente JimuMapView no Widget.tsx
- Adiciona ação de clicar no ponto e pegar o ObjectID

### Setting-3 e Widget-4 (Configurando DataSource)
- Adiciona Seletor de DataSource no Setting.tsx
- Adiciona Componente de DataSource no Widget.tsx
- Integra seleção no JimuMapView com o DataSource 

### Widget-5 (Integra click no mapae dados do Data Source)
- Busca dados do ObjectID selecionado no DataSource
- Adiciona dados na UI

### Widget-6 (Criar um novo Evento)
- Adiciona novo ponto no mapa 
- Salva o ponto na Feature Layer
