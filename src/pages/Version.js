import { labels } from "../resources/labels";
import Template from "../components/Common/Template";
import versionHistory from "../assets/versionHistory";

const Version = () => {
    const getVersionInfo = (info) => {
        const link = info.link ? <a rel='noreferrer noopener' href={info.link} target='_blank'>link</a> : <></>;
        return <li key={info.id} className="version-info">
            {info.title}{info.link ? ' - ' : ''}{link}
        </li>
    }

    return (
        <Template>
            <h1>{labels.versionHistory}</h1>
            {versionHistory.map((version) => <div className="version-body" key={version.id}>
                <h3 className="version-title">v{version.version} - {version.title}</h3>
                <ul>
                    {version.info.map((info) => getVersionInfo(info))}
                </ul>
            </div>)}
        </Template>
    );
}

export default Version;