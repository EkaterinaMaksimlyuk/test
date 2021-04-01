import axios from 'axios';

const getList = async (props = {}) => {
  const { perPage = 6, page = 1 } = props;
  if (!props.path || page !== 1) {
    return [];
  }
  const lastPageIndex = page - 1;
  const items = await axios(props.path);
  if (!items || !items.data || !items.data.length) {
    return [];
  }
  if (!props.query) {
    return items.data.slice(lastPageIndex * perPage, perPage);
  }
  const regexp = new RegExp(`.*${props.query}.*`, 'i');
  console.info(regexp);
  const result = items.data.filter((item) => item.title.match(regexp));
  return result.slice(lastPageIndex * perPage, perPage);
};

export default getList;
