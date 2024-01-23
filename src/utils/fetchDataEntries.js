const dataEntries = require.context('../../public/data', true, /metadata\.json$/);

const fetchDataEntries = () =>
  dataEntries.keys().map((key) => ({
    id: key.replace(/^\.\/|\/metadata\.json$/g, ''),
    metadata: dataEntries(key),
  }));

export default fetchDataEntries;