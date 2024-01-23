import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress } from '@mui/material';

const VelocityTab = ({ dataEntry }) => {
  const [velocityData, setVelocityData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/data/${dataEntry?.id}/velocity.json`);
        const data = await response.json();
        setVelocityData(data?.velocity);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching velocity data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dataEntry?.id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {loading && <div style={{textAlign: 'center'}}><CircularProgress /></div>}
      {!loading && velocityData && velocityData.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? velocityData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : velocityData
              ).map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data?.timestamp}</TableCell>
                  <TableCell>{data?.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!loading && (!velocityData || velocityData.length === 0) && <div>No data available</div>}
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={velocityData?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default VelocityTab;