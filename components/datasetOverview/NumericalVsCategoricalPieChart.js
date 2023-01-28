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
    margin={{ top: 40, right: 80, bottom: 80, left: 0 }}
    startAngle={30}
    endAngle={390}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
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
    arcLinkLabelsTextOffset={10}
    arcLinkLabelsTextColor={{ theme: 'labels.text.fill' }}
    arcLinkLabelsDiagonalLength={22}
    arcLinkLabelsStraightLength={27}
    arcLinkLabelsThickness={3}
    arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          '3'
        ]
      ]
    }}
    theme={{fontSize: 15,fontWeight: 900}}
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
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 20,
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