import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
    {
      "id": "Non Null Values",
      "label": "Non Null Values",
      "value": 96,
      "color": "hsl(220, 70%, 50%)"
    },
    {
      "id": "Null Values",
      "label": "Null Values",
      "value": 4,
      "color": "hsl(200, 70%, 50%)"
    },
  ]
  
const NumericalVsCategoricalPieChart = ({ /* see data tab */ }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    startAngle={30}
    endAngle={390}
    sortByValue={true}
    innerRadius={0.5}
    padAngle={2}
    cornerRadius={5}
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'category10' }}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          '0.2'
        ]
      ]
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    theme={{
      fontSize:15
    }}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          2
        ]
      ]
    }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10
      }
    ]}
    fill={[
      {
        match: {
          id: 'ruby'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'c'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'go'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'python'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'scala'
        },
        id: 'lines'
      },
      {
        match: {
          id: 'lisp'
        },
        id: 'lines'
      },
      {
        match: {
          id: 'elixir'
        },
        id: 'lines'
      },
      {
        match: {
          id: 'javascript'
        },
        id: 'lines'
      }
    ]}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 50,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 200,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000'
            }
          }
        ]
      }
    ]}
  />
)

export default NumericalVsCategoricalPieChart;