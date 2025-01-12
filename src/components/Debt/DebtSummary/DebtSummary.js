import { useSelector } from 'react-redux';
import './DebtSummary.css';

const DebtSummary = () => {
    const { debtSummary } = useSelector((state) => state.debt);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <>
            {debtSummary.length > 0 && <ul className='debtSummary'>
                {debtSummary.map((debt) => (
                    <li key={debt.name}>
                        <h4>{debt.name}</h4>
                        <p className={textClass(debt.amount)}>{'$' + (debt.amount).toFixed(2)}</p>
                    </li>
                ))}
            </ul>}
        </>
    );
}

export default DebtSummary;