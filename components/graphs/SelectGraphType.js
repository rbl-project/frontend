import { List } from '@mui/material';
import React from 'react';

// Icons
import LinePlotIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import BarGraphIcon from '@mui/icons-material/SignalCellularAlt';
import HistogramIcon from '@mui/icons-material/BarChart';
import DensityPlotIcon from '@mui/icons-material/MultilineChartOutlined';
import HexbinPlotIcon from '@mui/icons-material/HiveOutlined';
import PieChartIcon from '@mui/icons-material/PieChart';
import {AiFillBoxPlot as BoxPlotIcon} from 'react-icons/ai';

// List Item Component
import SelectGraphTypeItem from './SelectGraphTypeItem';

const SelectGraphType = ({setTabName, seletedTabName}) => {
  return (
    <List sx={{width:"95%",mx:"auto",height:"84vh"}}>
        <SelectGraphTypeItem value="line-plot" name="Line Plot" ItemIcon={LinePlotIcon} setTabName={setTabName} seletedTabName={seletedTabName}/>
        <SelectGraphTypeItem value="scatter-plot" name="Scatter Plot" ItemIcon={ScatterPlotIcon} setTabName={setTabName} seletedTabName={seletedTabName} />
        <SelectGraphTypeItem value="bar-graph" name="Bar Graph" ItemIcon={BarGraphIcon} setTabName={setTabName} seletedTabName={seletedTabName}/>
        <SelectGraphTypeItem value="histogram" name="Histogram" ItemIcon={HistogramIcon} setTabName={setTabName} seletedTabName={seletedTabName} />
        <SelectGraphTypeItem value="density-plot" name="Desnity Plot" ItemIcon={DensityPlotIcon} setTabName={setTabName} seletedTabName={seletedTabName} />
        <SelectGraphTypeItem value="hexbin-plot" name="Hexbin Plot" ItemIcon={HexbinPlotIcon} setTabName={setTabName} seletedTabName={seletedTabName} />
        <SelectGraphTypeItem value="pie-chart" name="Pie Chart" ItemIcon={PieChartIcon} setTabName={setTabName} seletedTabName={seletedTabName} />
        <SelectGraphTypeItem value="box-plot" name="Box Plot" ItemIcon={BoxPlotIcon} setTabName={setTabName} seletedTabName={seletedTabName} />
    </List>
  )
}

export default SelectGraphType;