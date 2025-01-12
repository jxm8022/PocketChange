import { labels } from "../resources/labels";
import DeveloperInfo from "../components/DeveloperInfo/DeveloperInfo";
import SiteInfo from "../components/SiteInfo/SiteInfo";
import Template from "../components/UI/Template/Template";

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