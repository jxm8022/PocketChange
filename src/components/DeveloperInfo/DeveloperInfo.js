import { labels } from '../../resources/labels';
import github from '../../assets/images/socialMedia/github-48.png';
import linkedin from '../../assets/images/socialMedia/linkedin-48.png';
import me from '../../assets/images/socialMedia/me.jpeg';
import './DeveloperInfo.css';

const DeveloperInfo = () => {
    return (
        <>
            <hr id='developer' className='about-separator' color='black' />
            <img src={me} alt='Developer Avatar' style={{ 'borderRadius': '50%' }} />
            <h2>
                {labels.devJose}
            </h2>
            <p className='bio'>
                {labels.bio}
            </p>
            <ul className='social-media'>
                <li>
                    <a rel='noreferrer noopener' target='_blank' href='https://github.com/jxm8022'>
                        <img src={github} alt='GitHub logo.' />
                    </a>
                </li>
                <li>
                    <a rel='noreferrer noopener' target='_blank' href='https://www.linkedin.com/in/josemendoza9486/'>
                        <img src={linkedin} alt='Linkedin logo.' />
                    </a>
                </li>
            </ul>
        </>
    );
}

export default DeveloperInfo;