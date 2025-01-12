import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menu from '../../../../assets/images/menu/menu-rounded-100.png';
import './CollapseSideBar.css';

const CollapseSideBar = (props) => {
    const { links } = props;
    const [displayStyle, setDisplayStyle] = useState('0px');
    const [backgroundDisplay, setBackgroundDisplay] = useState('none');

    function openNav() {
        displayStyle === '220px' ? setDisplayStyle('0px') : setDisplayStyle('220px');
        backgroundDisplay === 'none' ? setBackgroundDisplay('block') : setBackgroundDisplay('none');
    }

    return (
        <>
            <div onClick={openNav} style={{ display: backgroundDisplay}} className='navbar-background'></div>
            <div style={{ width: displayStyle }} className="sidebar">
                {links.map((link) => <NavLink
                    key={link.id}
                    to={link.where}
                    onClick={link.do}
                    className={
                        ({ isActive }) => {
                            return isActive ? 'side-active side-navbarLink' : 'side-navbarLink'
                        }
                    }
                >
                    {link.name}
                </NavLink>)}
            </div>
            <img onClick={openNav} className='openSideBar' src={menu} alt='Menu button.' />
        </>
    );
}

export default CollapseSideBar;