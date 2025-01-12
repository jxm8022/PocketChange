import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../../actions/pageActions';
import './Notification.css';

const Notification = () => {
    const { message } = useSelector((state) => state.page);
    const dispatch = useDispatch();

    let classes = 'baseFlag';

    if (message) {
        classes = 'baseFlag notificationFlag';
        setTimeout(() => {
            dispatch(setMessage(''));
        }, 10000);
    }

    return (
        <>
            <p className={classes}>{message}</p>
        </>
    );
}

export default Notification;