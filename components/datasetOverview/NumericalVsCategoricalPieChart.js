import { ResponsivePie } from '@nivo/pie'

const NumericalVsCategoricalPieChart = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 90, left: 80 }}
    startAngle={45}
    endAngle={405}
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
    arcLabelsTextColor="#ffffff"
    theme={{fontSize: 15}}
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
          id: 'Categorical Columns'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'Numerical Columns'
        },
        id: 'lines'
      },
    ]}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 50,
        translateY: 50,
        itemsSpacing: 10,
        itemWidth: 210,
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