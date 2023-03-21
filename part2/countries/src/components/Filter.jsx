const Filter = ({ query, handleChangeQuery }) => {
	return (
		<div>
			Search Country:
			<input type="search" value={query} onChange={handleChangeQuery} />
		</div>
	);
};

export default Filter;
