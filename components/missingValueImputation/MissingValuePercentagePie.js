import { ResponsivePie } from '@nivo/pie';



const MissingValuePercentagePie = ({ missingValueData }) => {

    const data = [
        {
            "id": "Correct Values",
            "label": "Correct Values",
            "value": missingValueData?.correct_value_percentage ,
        },
        {
            "id": "Missing Values",
            "label": "Missing Values",
            "value": missingValueData?.missing_value_percentage,
        },
    ];

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            startAngle={0}
            endAngle={360}
            innerRadius={0.6}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'dark2' }}
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
            arcLabel={(d) => `${d.value}%`}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextOffset={10}
            arcLinkLabelsTextColor={{ theme: 'labels.text.fill' }}
            arcLinkLabelsDiagonalLength={22}
            arcLinkLabelsStraightLength={27}
            arcLinkLabelsThickness={3}
            arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#ffffff"
            theme={{ fontSize: 15 }}
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
                        id: 'Correct Values'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'Missing Values'
                    },
                    id: 'dots'
                },
            ]}
            legends={[]}
        />
    )
}

export default MissingValuePercentagePie;