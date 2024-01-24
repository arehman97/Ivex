const dataEntries = require.context('../../public/data', true, /metadata\.json$/);

export const fetchDataEntries = () =>
  dataEntries.keys().map((key) => ({
    id: key.replace(/^\.\/|\/metadata\.json$/g, ''),
    metadata: dataEntries(key),
}));

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric', 
    hour12: true 
  };

  return date.toLocaleString('en-US', options);
};