import { labels } from "../resources/labels";
import MonthDetails from "../components/DisplayMonth/MonthDetails/MonthDetails";
import MonthSelector from "../components/DisplayMonth/MonthSelector/MonthSelector";
import MonthOverview from "../components/DisplayMonth/MonthOverview/MonthOverview";
import Template from "../components/UI/Template/Template";

const DisplayMonth = () => {
    return (
        <Template>
            <h1>{labels.monthOverview}</h1>
            <MonthSelector />
            {/*<MonthOverview />*/}
            <MonthDetails />
            <a href='#top' className="scroll-top">{labels.top}</a>
        </Template>
    );
}

export default DisplayMonth;