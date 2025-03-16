import React from "react";
import styled from "styled-components";

const Selector = (props) => {
    var options = props.options ?? [];
    var value = props.value ?? 0;
    return (
        <SelectorWrapper>
            <form>
                <label>{props.label}
                    <select className={props.className ?? 'selector'} value={value} onChange={props.onChange}>
                        {options.map((option) => <option key={option.id} value={option.id}>{option.value}</option>)}
                    </select>
                </label>
            </form>
        </SelectorWrapper>
    );
}

export default Selector;

const SelectorWrapper = styled.div`
    .selector {
        cursor: pointer;
        border: none;
        border: 1px solid var(--teal);
        border-radius: 50px;
        margin: 10px;
        padding: 0px 10px;
        background-color: var(--pink);
        font: inherit;
        font-size: .75em;
        color: var(--teal);
        outline: none;
    }
`;