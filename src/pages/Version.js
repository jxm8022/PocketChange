import { labels } from "../resources/labels";
import versionHistory from "../assets/versionHistory";
import Template from "../components/UI/Template/Template";

const Version = () => {
    return (
        <Template>
            <h1>{labels.versionHistory}</h1>
            {versionHistory.map((version) => <div className="version-body" key={version.id}>
                <h3 className="version-title">v{version.version} - {version.title}</h3>
                {version.info.map((info) => <p key={info.id} className="version-info">{info.title} - <a rel='noreferrer noopener' href={info.link} target='_blank'>issue</a></p>)}
            </div>)}
        </Template>
    );
}

export default Version;