import {
  GRAPH_TYPE_LINE_CHART,
  GRAPH_TYPE_BAR_CHART
} from '../../graph/constants'

const data1 = {
  url:
    'https://api.apeiron.io/v2/graphs/voice/calls_total/{{trunk_id}}/{{direction}}',
  auth: {
    username: 'mauricio.severi1212@gmail.com',
    password: 'g470E6bTu796eZIfwzzIkJmjsCsElZAlX2NLlqtT8wWFsaDTC1J9ZDgB9624CEJv'
  },
  components: {
    trunk_id: {
      label: 'Trunk Groups',
      type: 'drop_down',
      choices: [
        { label: 'Choice 1', value: 101064 },
        { label: 'Choice 2', value: 101065 }
      ]
    },
    direction: {
      label: 'Direction',
      type: 'drop_down',
      default: 'both',
      choices: [
        { label: 'Inbound', value: 'inbound' },
        { label: 'Outbound', value: 'outbound' },
        { label: 'Both', value: 'both' }
      ]
    }
  },
  minStartDate: '1990-01-01T00:00:00',
  maxEndDate: '2030-12-31T00:00:00',
  defaultStartDate: '2019-01-01T00:00:00',
  defaultEndDate: '2019-01-15T00:00:00',
  chartHeight: 400,
  chartType: GRAPH_TYPE_LINE_CHART
}

const data2 = {
  url:
    'https://api.apeiron.io/v2/graphs/voice/calls_total/{{trunk_id}}/{{direction}}',
  auth: {
    username: 'mauricio.severi1212@gmail.com',
    password: 'g470E6bTu796eZIfwzzIkJmjsCsElZAlX2NLlqtT8wWFsaDTC1J9ZDgB9624CEJv'
  },
  components: {
    trunk_id: {
      label: 'Trunk Groups',
      type: 'drop_down',
      choices: [
        { label: 'Choice 1', value: 101064 },
        { label: 'Choice 2', value: 101065 }
      ]
    },
    direction: {
      label: 'Direction',
      type: 'drop_down',
      default: 'both',
      choices: [
        { label: 'Inbound', value: 'inbound' },
        { label: 'Outbound', value: 'outbound' },
        { label: 'Both', value: 'both' }
      ]
    }
  },
  minStartDate: '1990-01-01T00:00:00',
  maxEndDate: '2030-12-31T00:00:00',
  defaultStartDate: '2019-01-15T00:00:00',
  defaultEndDate: '2019-01-30T00:00:00',
  chartHeight: 400,
  chartType: GRAPH_TYPE_BAR_CHART
}

export { data1, data2 }
