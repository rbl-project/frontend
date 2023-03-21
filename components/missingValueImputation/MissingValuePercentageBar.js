import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MissingValuePercentageBar = ({ missingValuePercentage, correctValuePercentage }) => {

    const data = [
        {
            "id": "",
            "Correct Values": correctValuePercentage,
            "Missing Values": missingValuePercentage,
        }
    ]

    return (
        <ResponsiveBar
            data={data}
            keys={[
                'Correct Values',
                'Missing Values',
            ]}
            indexBy='id'
            margin={{}}
            padding={0}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'dark2' }}
            label={(d) => `${d.value}%`}
            labelSkipWidth={40}
            labelTextColor="#ffffff"
            theme={{ fontSize: 15 }}
            defs={[
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: 45,
                    lineWidth: 2,
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
                    id: 'lines'
                },
            ]}

            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridY={false}
            legends={[]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={null}
        />

    )
}

export default MissingValuePercentageBar;