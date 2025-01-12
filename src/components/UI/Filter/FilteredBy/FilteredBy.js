import './FilteredBy.css';

const FilteredBy = (props) => {
    const { filter, removeFilterX } = props;
    return (
        <>
            <p onClick={() => { removeFilterX(filter) }} className="filtered-by">{filter.name}</p>
        </>
    );
}

export default FilteredBy;