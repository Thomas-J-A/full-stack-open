import { useDispatch } from 'react-redux';

import { setFilter } from '../../slices/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => dispatch(setFilter(e.target.value));

  return (
    <div>
      <label>
        Filter:
        <input type="text" onChange={handleChange} />
      </label>
    </div>
  );
};

export default Filter;
