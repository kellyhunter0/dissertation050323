import DataObjectIcon from '@mui/icons-material/DataObject'; //empty data
import QueryStatsIcon from '@mui/icons-material/QueryStats'; ////outliers (line chart with magnifying glass)
import InsightsIcon from '@mui/icons-material/Insights'; //could be predictions
import AutoGraphIcon from '@mui/icons-material/AutoGraph'; //could be predictions
import { Icon } from '@iconify/react';
import { CButton } from '@coreui/react';


export const Buttons = () => {


return (
<>

<CButton>
<Icon icon="mdi:chart-bell-curve-cumulative" href=''/>
</CButton>

<CButton><Icon icon="mdi:chart-areaspline-variant"/> </CButton>

<CButton><Icon icon="mdi:chart-areaspline"/></CButton>

</>
)
}