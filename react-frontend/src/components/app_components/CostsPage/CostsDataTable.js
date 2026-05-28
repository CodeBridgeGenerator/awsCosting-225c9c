import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";
import { Checkbox } from "primereact/checkbox";

const CostsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);
  const header = (
    <div
      className="table-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h5 className="m-0"></h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

const pDateTemplate0 = (rowData, { rowIndex }) => <p >{rowData.date}</p>
const pLinkedAccountIdTemplate1 = (rowData, { rowIndex }) => <p >{rowData.linkedAccountId}</p>
const pLinkedAccountNameTemplate2 = (rowData, { rowIndex }) => <p >{rowData.linkedAccountName}</p>
const pServiceTemplate3 = (rowData, { rowIndex }) => <p >{rowData.service}</p>
const pUsageTypeTemplate4 = (rowData, { rowIndex }) => <p >{rowData.usageType}</p>
const pItemDescriptionTemplate5 = (rowData, { rowIndex }) => <p >{rowData.itemDescription}</p>
const pResourceNameTemplate6 = (rowData, { rowIndex }) => <p >{rowData.resourceName}</p>
const pResourceIdTemplate7 = (rowData, { rowIndex }) => <p >{rowData.resourceId}</p>
const pAvailabilityZoneTemplate8 = (rowData, { rowIndex }) => <p >{rowData.availabilityZone}</p>
const pUnitPriceTemplate9 = (rowData, { rowIndex }) => <p >{rowData.unitPrice}</p>
const pUsageQuantityTemplate10 = (rowData, { rowIndex }) => <p >{rowData.usageQuantity}</p>
const pAmountTemplate11 = (rowData, { rowIndex }) => <p >{rowData.amount}</p>
const pPreviousMonthAmountTemplate12 = (rowData, { rowIndex }) => <p >{rowData.previousMonthAmount}</p>
const pMonthlyGrowthTemplate13 = (rowData, { rowIndex }) => <p >{rowData.monthlyGrowth}</p>
const pTagDepartmentTemplate14 = (rowData, { rowIndex }) => <p >{rowData.tagDepartment}</p>
const pTagApplicationTemplate15 = (rowData, { rowIndex }) => <p >{rowData.tagApplication}</p>
const pTagEnvironmentTemplate16 = (rowData, { rowIndex }) => <p >{rowData.tagEnvironment}</p>
const pTagOwnerTemplate17 = (rowData, { rowIndex }) => <p >{rowData.tagOwner}</p>
const pTagProjectTemplate18 = (rowData, { rowIndex }) => <p >{rowData.tagProject}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        globalFilter={globalFilter}
        header={header}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="date" header="Date" body={pDateTemplate0} filter={selectedFilterFields.includes("date")} hidden={selectedHideFields?.includes("date")}    style={{ minWidth: "8rem" }} />
<Column field="linkedAccountId" header="Linked Account Id" body={pLinkedAccountIdTemplate1} filter={selectedFilterFields.includes("linkedAccountId")} hidden={selectedHideFields?.includes("linkedAccountId")}    style={{ minWidth: "8rem" }} />
<Column field="linkedAccountName" header="Linked Account Name" body={pLinkedAccountNameTemplate2} filter={selectedFilterFields.includes("linkedAccountName")} hidden={selectedHideFields?.includes("linkedAccountName")}    style={{ minWidth: "8rem" }} />
<Column field="service" header="Service" body={pServiceTemplate3} filter={selectedFilterFields.includes("service")} hidden={selectedHideFields?.includes("service")}    style={{ minWidth: "8rem" }} />
<Column field="usageType" header="Usage Type" body={pUsageTypeTemplate4} filter={selectedFilterFields.includes("usageType")} hidden={selectedHideFields?.includes("usageType")}    style={{ minWidth: "8rem" }} />
<Column field="itemDescription" header="Item Description" body={pItemDescriptionTemplate5} filter={selectedFilterFields.includes("itemDescription")} hidden={selectedHideFields?.includes("itemDescription")}    style={{ minWidth: "8rem" }} />
<Column field="resourceName" header="Resource Name" body={pResourceNameTemplate6} filter={selectedFilterFields.includes("resourceName")} hidden={selectedHideFields?.includes("resourceName")}    style={{ minWidth: "8rem" }} />
<Column field="resourceId" header="Resource ID" body={pResourceIdTemplate7} filter={selectedFilterFields.includes("resourceId")} hidden={selectedHideFields?.includes("resourceId")}    style={{ minWidth: "8rem" }} />
<Column field="availabilityZone" header="Availability Zone" body={pAvailabilityZoneTemplate8} filter={selectedFilterFields.includes("availabilityZone")} hidden={selectedHideFields?.includes("availabilityZone")}    style={{ minWidth: "8rem" }} />
<Column field="unitPrice" header="Unit Price" body={pUnitPriceTemplate9} filter={selectedFilterFields.includes("unitPrice")} hidden={selectedHideFields?.includes("unitPrice")}    style={{ minWidth: "8rem" }} />
<Column field="usageQuantity" header="Usage Quantity" body={pUsageQuantityTemplate10} filter={selectedFilterFields.includes("usageQuantity")} hidden={selectedHideFields?.includes("usageQuantity")}    style={{ minWidth: "8rem" }} />
<Column field="amount" header="Amount" body={pAmountTemplate11} filter={selectedFilterFields.includes("amount")} hidden={selectedHideFields?.includes("amount")}    style={{ minWidth: "8rem" }} />
<Column field="previousMonthAmount" header="Previous Month Amount" body={pPreviousMonthAmountTemplate12} filter={selectedFilterFields.includes("previousMonthAmount")} hidden={selectedHideFields?.includes("previousMonthAmount")}    style={{ minWidth: "8rem" }} />
<Column field="monthlyGrowth" header="Monthly Growth" body={pMonthlyGrowthTemplate13} filter={selectedFilterFields.includes("monthlyGrowth")} hidden={selectedHideFields?.includes("monthlyGrowth")}    style={{ minWidth: "8rem" }} />
<Column field="tagDepartment" header="Tag Department" body={pTagDepartmentTemplate14} filter={selectedFilterFields.includes("tagDepartment")} hidden={selectedHideFields?.includes("tagDepartment")}    style={{ minWidth: "8rem" }} />
<Column field="tagApplication" header="Tag Application" body={pTagApplicationTemplate15} filter={selectedFilterFields.includes("tagApplication")} hidden={selectedHideFields?.includes("tagApplication")}    style={{ minWidth: "8rem" }} />
<Column field="tagEnvironment" header="Tag Environment" body={pTagEnvironmentTemplate16} filter={selectedFilterFields.includes("tagEnvironment")} hidden={selectedHideFields?.includes("tagEnvironment")}    style={{ minWidth: "8rem" }} />
<Column field="tagOwner" header="Tag Owner" body={pTagOwnerTemplate17} filter={selectedFilterFields.includes("tagOwner")} hidden={selectedHideFields?.includes("tagOwner")}    style={{ minWidth: "8rem" }} />
<Column field="tagProject" header="Tag Project" body={pTagProjectTemplate18} filter={selectedFilterFields.includes("tagProject")} hidden={selectedHideFields?.includes("tagProject")}    style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload Costs Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="costs"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Costs" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default CostsDataTable;