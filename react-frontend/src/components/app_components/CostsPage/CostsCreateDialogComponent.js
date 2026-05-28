import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const CostsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            date: _entity?.date,linkedAccountId: _entity?.linkedAccountId,linkedAccountName: _entity?.linkedAccountName,service: _entity?.service,usageType: _entity?.usageType,itemDescription: _entity?.itemDescription,resourceName: _entity?.resourceName,resourceId: _entity?.resourceId,availabilityZone: _entity?.availabilityZone,unitPrice: _entity?.unitPrice,usageQuantity: _entity?.usageQuantity,amount: _entity?.amount,previousMonthAmount: _entity?.previousMonthAmount,monthlyGrowth: _entity?.monthlyGrowth,tagDepartment: _entity?.tagDepartment,tagApplication: _entity?.tagApplication,tagEnvironment: _entity?.tagEnvironment,tagOwner: _entity?.tagOwner,tagProject: _entity?.tagProject,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("costs").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Costs created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Costs" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Costs" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="costs-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="date">Date:</label>
                <InputText id="date" className="w-full mb-3 p-inputtext-sm" value={_entity?.date} onChange={(e) => setValByKey("date", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["date"]) ? (
              <p className="m-0" key="error-date">
                {error["date"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="linkedAccountId">Linked Account Id:</label>
                <InputText id="linkedAccountId" className="w-full mb-3 p-inputtext-sm" value={_entity?.linkedAccountId} onChange={(e) => setValByKey("linkedAccountId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["linkedAccountId"]) ? (
              <p className="m-0" key="error-linkedAccountId">
                {error["linkedAccountId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="linkedAccountName">Linked Account Name:</label>
                <InputText id="linkedAccountName" className="w-full mb-3 p-inputtext-sm" value={_entity?.linkedAccountName} onChange={(e) => setValByKey("linkedAccountName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["linkedAccountName"]) ? (
              <p className="m-0" key="error-linkedAccountName">
                {error["linkedAccountName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="service">Service:</label>
                <InputText id="service" className="w-full mb-3 p-inputtext-sm" value={_entity?.service} onChange={(e) => setValByKey("service", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["service"]) ? (
              <p className="m-0" key="error-service">
                {error["service"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="usageType">Usage Type:</label>
                <InputText id="usageType" className="w-full mb-3 p-inputtext-sm" value={_entity?.usageType} onChange={(e) => setValByKey("usageType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["usageType"]) ? (
              <p className="m-0" key="error-usageType">
                {error["usageType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="itemDescription">Item Description:</label>
                <InputText id="itemDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.itemDescription} onChange={(e) => setValByKey("itemDescription", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["itemDescription"]) ? (
              <p className="m-0" key="error-itemDescription">
                {error["itemDescription"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="resourceName">Resource Name:</label>
                <InputText id="resourceName" className="w-full mb-3 p-inputtext-sm" value={_entity?.resourceName} onChange={(e) => setValByKey("resourceName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["resourceName"]) ? (
              <p className="m-0" key="error-resourceName">
                {error["resourceName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="resourceId">Resource ID:</label>
                <InputText id="resourceId" className="w-full mb-3 p-inputtext-sm" value={_entity?.resourceId} onChange={(e) => setValByKey("resourceId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["resourceId"]) ? (
              <p className="m-0" key="error-resourceId">
                {error["resourceId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="availabilityZone">Availability Zone:</label>
                <InputText id="availabilityZone" className="w-full mb-3 p-inputtext-sm" value={_entity?.availabilityZone} onChange={(e) => setValByKey("availabilityZone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["availabilityZone"]) ? (
              <p className="m-0" key="error-availabilityZone">
                {error["availabilityZone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unitPrice">Unit Price:</label>
                <InputText id="unitPrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.unitPrice} onChange={(e) => setValByKey("unitPrice", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitPrice"]) ? (
              <p className="m-0" key="error-unitPrice">
                {error["unitPrice"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="usageQuantity">Usage Quantity:</label>
                <InputText id="usageQuantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.usageQuantity} onChange={(e) => setValByKey("usageQuantity", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["usageQuantity"]) ? (
              <p className="m-0" key="error-usageQuantity">
                {error["usageQuantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amount">Amount:</label>
                <InputText id="amount" className="w-full mb-3 p-inputtext-sm" value={_entity?.amount} onChange={(e) => setValByKey("amount", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amount"]) ? (
              <p className="m-0" key="error-amount">
                {error["amount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="previousMonthAmount">Previous Month Amount:</label>
                <InputText id="previousMonthAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.previousMonthAmount} onChange={(e) => setValByKey("previousMonthAmount", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["previousMonthAmount"]) ? (
              <p className="m-0" key="error-previousMonthAmount">
                {error["previousMonthAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="monthlyGrowth">Monthly Growth:</label>
                <InputText id="monthlyGrowth" className="w-full mb-3 p-inputtext-sm" value={_entity?.monthlyGrowth} onChange={(e) => setValByKey("monthlyGrowth", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["monthlyGrowth"]) ? (
              <p className="m-0" key="error-monthlyGrowth">
                {error["monthlyGrowth"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tagDepartment">Tag Department:</label>
                <InputText id="tagDepartment" className="w-full mb-3 p-inputtext-sm" value={_entity?.tagDepartment} onChange={(e) => setValByKey("tagDepartment", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tagDepartment"]) ? (
              <p className="m-0" key="error-tagDepartment">
                {error["tagDepartment"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tagApplication">Tag Application:</label>
                <InputText id="tagApplication" className="w-full mb-3 p-inputtext-sm" value={_entity?.tagApplication} onChange={(e) => setValByKey("tagApplication", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tagApplication"]) ? (
              <p className="m-0" key="error-tagApplication">
                {error["tagApplication"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tagEnvironment">Tag Environment:</label>
                <InputText id="tagEnvironment" className="w-full mb-3 p-inputtext-sm" value={_entity?.tagEnvironment} onChange={(e) => setValByKey("tagEnvironment", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tagEnvironment"]) ? (
              <p className="m-0" key="error-tagEnvironment">
                {error["tagEnvironment"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tagOwner">Tag Owner:</label>
                <InputText id="tagOwner" className="w-full mb-3 p-inputtext-sm" value={_entity?.tagOwner} onChange={(e) => setValByKey("tagOwner", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tagOwner"]) ? (
              <p className="m-0" key="error-tagOwner">
                {error["tagOwner"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tagProject">Tag Project:</label>
                <InputText id="tagProject" className="w-full mb-3 p-inputtext-sm" value={_entity?.tagProject} onChange={(e) => setValByKey("tagProject", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tagProject"]) ? (
              <p className="m-0" key="error-tagProject">
                {error["tagProject"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CostsCreateDialogComponent);
