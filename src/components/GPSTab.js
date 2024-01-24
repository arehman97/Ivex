import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { FixedSizeList as List } from 'react-window';
import { formatTimestamp } from '../utils/fetchDataEntries';

const StyledTextField = styled(TextField)({
  marginBottom: '5px',
  textAlign: 'end',
  '& input': {
    padding: '10px',
  },
  '& label': {
    lineHeight: '0.85em',
  },
});

const columnWidths = [120, 200, 400];

const Row = ({ index, style, data }) => {
  const val = data[index];

  return (
    <TableRow style={style}>
      {columnWidths.map((width, columnIndex) => (
        <TableCell key={columnIndex} style={{ width: `${width}px` }}>
          {columnIndex === 0 ? val?.sNo : 
          columnIndex === 1 ? formatTimestamp(val.timestamp) : 
          columnIndex === 2 ? `Lat: ${val.value.lat} - Lon: ${val.value.lon}` : null}
        </TableCell>
      ))}
    </TableRow>
  );
};

const GPSTab = ({ dataEntry, data, onDataUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/data/${dataEntry?.id}/gps.json`);
        const fetchedData = await response.json();
        onDataUpdate(fetchedData?.gps);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching gps data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dataEntry?.id]);

  useEffect(() => {
    const filterData = data.map((item, index) => ({ ...item, sNo: index + 1 })).filter((item) =>
      String(item.timestamp).includes(searchQuery) || 
      String(item.value.lat).includes(searchQuery) ||
      String(item.value.lon).includes(searchQuery)
    );

    setFilteredData(filterData);
  }, [data, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', textAlign: 'end' }}>
        <StyledTextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading && <div style={{ textAlign: 'center' }}><CircularProgress /></div>}
      {!loading && (filteredData.length > 0 || (data && data.length > 0)) && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={120}>S.No</TableCell>
                  <TableCell width={200}>Date & Time</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>

          <TableContainer style={{ maxHeight: '400px' }}>
            <Table>
              <TableBody>
                <List
                  height={300}
                  itemCount={filteredData.length}
                  itemSize={50}
                  width="100%"
                  itemData={filteredData}
                >
                  {Row}
                </List>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {!loading && filteredData.length === 0 && <div>No matching data found</div>}
    </div>
  );
};

export default GPSTab;