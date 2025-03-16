import { labels } from "../resources/labels";
import DeveloperInfo from "../components/About/DeveloperInfo/DeveloperInfo";
import SiteInfo from "../components/About/SiteInfo";
import Template from "../components/Common/Template";

const About = () => {
    return (
        <Template>
            <h1>{labels.about}</h1>
            <SiteInfo />
            <DeveloperInfo />
            <a href='#top' className="scroll-top">{labels.top}</a>
        </Template>
    );
}

export default About;