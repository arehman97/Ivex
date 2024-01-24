import React, { useState } from 'react';
import { Table, TableBody, TableCell, TablePagination, TableContainer, TableHead, TableRow, Paper, Typography, Button, Modal, Box, Tab, Tabs, IconButton } from '@mui/material';
import { format } from 'date-fns';
import { fetchDataEntries } from '../utils/fetchDataEntries';
import VelocityTab from './tabs/VelocityTab';
import AccelerationTab from './tabs/AccelerationTab';
import GPSTab from './tabs/GPSTab';
import ClearIcon from '@mui/icons-material/Clear';

const MetadataTable = () => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMM yyyy hh:mm a');
  };

  const dataEntries = fetchDataEntries();
  const [selectedDataEntry, setSelectedDataEntry] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [velocityData, setVelocityData] = useState([]);
  const [accelerationData, setAccelerationData] = useState([]);
  const [gpsData, setGPSData] = useState([]);

  const updateVelocityData = (newData) => {
    setVelocityData(newData);
  };

  const updateAccelerationData = (newData) => {
    setAccelerationData(newData);
  };

  const updateGPSData = (newData) => {
    setGPSData(newData);
  };

  const handleViewDetails = (dataEntry) => {
    setSelectedDataEntry(dataEntry);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setActiveTab(0);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h6">Vehicle Entries</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle ID</TableCell>
              <TableCell>Recorded Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Length in Meters</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEntries.map((dataEntry) => (
              <TableRow key={dataEntry?.id}>
                <TableCell>{dataEntry?.id}</TableCell>
                <TableCell>{formatDate(dataEntry?.metadata?.recordedDate)}</TableCell>
                <TableCell>{dataEntry?.metadata?.duration}</TableCell>
                <TableCell>{dataEntry?.metadata?.length_in_meters}</TableCell>
                <TableCell>
                  <Button style={{padding: 0}} onClick={() => handleViewDetails(dataEntry)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!dataEntries || dataEntries.length === 0) && <div>No data available</div>}
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={dataEntries?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <IconButton
                sx={{ position: 'absolute', top: 8, right: 8, color: 'primary.main' }}
                onClick={handleCloseModal}
                >
                <ClearIcon />
            </IconButton>
            <Typography variant="h6">Vehicle Id: {selectedDataEntry?.id}</Typography>
            <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Velocity" />
                <Tab label="Acceleration" />
                <Tab label="GPS" />
            </Tabs>
            {activeTab === 0 && <VelocityTab dataEntry={selectedDataEntry} data={velocityData} onDataUpdate={updateVelocityData}/>}
            {activeTab === 1 && <AccelerationTab dataEntry={selectedDataEntry} data={accelerationData} onDataUpdate={updateAccelerationData} />}
            {activeTab === 2 && <GPSTab dataEntry={selectedDataEntry} data={gpsData} onDataUpdate={updateGPSData}/>}
        </Box>
      </Modal>
    </div>
  );
};

export default MetadataTable;