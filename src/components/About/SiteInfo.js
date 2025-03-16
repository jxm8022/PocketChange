import { useSelector } from 'react-redux';
import { labels } from '../../resources/labels';
import './SiteInfo.css';

const Definitions = () => {
    return (
        <>
            <h2 id='definitions'>{labels.definitions}</h2>
            <div className='about-body'>
                <p>
                    <b>{labels.fiftyThirtyTwentyTitle}</b>
                    {labels.fiftyThirtyTwentyDefinition}
                </p>
                <p>
                    <b>{labels.zeroBasedTitle}</b>
                    {labels.zeroBasedDefinition}
                </p>
                <p>
                    <b>{labels.netBasedTitle}</b>
                    {labels.netBasedDefinition}
                </p>
                <p>
                    <b>{labels.netTitle}</b>
                    {labels.netDefinition}
                </p>
                <p className='equation'>{labels.netEquation}</p>
                <p>
                    <b>{labels.potentialNetTitle}</b>
                    {labels.potentialNetDefinition}
                </p>
                <p className='equation'>{labels.potentialNetEquation}</p>
                <p>
                    <b>{labels.projectedIncomeTitle}</b>
                    {labels.projectedIncomeDefinition}
                </p>
                <p>
                    <b>{labels.projectedNetTitle}</b>
                    {labels.projectedNetDefinition}
                </p>
                <p className='equation'>{labels.projectedNetEquation}</p>
                <p>
                    <b>{labels.wantTitle}</b>
                    {labels.wantDefinition}
                </p>
                <p className='equation'>{labels.wantExamples}</p>
                <p>
                    <b>{labels.needTitle}</b>
                    {labels.needDefinition}
                </p>
                <p className='equation'>{labels.needExamples}</p>
                <p>
                    <b>{labels.savingsTitle}</b>
                    {labels.savingsDefinition}
                </p>
                <p className='equation'>{labels.savingsExamples}</p>
                <p>
                    <b>{labels.debtTitle}</b>
                    {labels.debtDefinition}
                </p>
                <p className='equation'>{labels.debtExamples}</p>
                <p>
                    <b>{labels.incomeTitle}</b>
                    {labels.incomeDefinition}
                </p>
                <p className='equation'>{labels.incomeExamples}</p>
                <p>
                    <b>{labels.pTransactionsTitle}</b>
                    {labels.pTransactionsDefinition}
                </p>
                <p>
                    <b>{labels.pIncomeTitle}</b>
                    {labels.pIncomeDefinition}
                </p>
            </div>
        </>
    );
}

const HowTo = () => {
    return (
        <>
            <h2 id='howto'>{labels.howTo}</h2>
            <p className='about-body'>
                Based off of your personal bank records, add a transaction when a payment has been finalized on your account.
                The transaction type determines how your budget is calculated. For pending transactions, they have their own types, <b>pTransaction</b> and <b>pIncome</b>.
            </p>
        </>
    );
}

const SiteInfo = () => {
    return (
        <>
            <ul className='page-references'>
                <li><a href='#howto' className='inline-anchor'>{labels.howTo}</a></li>
                <li className='middle'><a href='#developer' className='inline-anchor'>{labels.aboutDeveloper}</a></li>
                <li><a href='#definitions' className='inline-anchor'>{labels.definitions}</a></li>
            </ul >
            <p className='about-body'>
                This website uses two main budgeting strategies. The first strategy is the <b>50/30/20</b> budget. The second strategy is loosely based on the <b>Zero-Based Budget</b>, <b>Net-Based Budget</b>.
            </p>
            <HowTo />
            <Definitions />
        </>
    );
}

export default SiteInfo;