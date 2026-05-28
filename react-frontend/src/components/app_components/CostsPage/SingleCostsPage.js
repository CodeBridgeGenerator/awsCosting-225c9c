import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";


const SingleCostsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    

    useEffect(() => {
        //on mount
        client
            .service("costs")
            .get(urlParams.singleCostsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Costs", type: "error", message: error.message || "Failed get costs" });
            });
    }, [props,urlParams.singleCostsId]);


    const goBack = () => {
        navigate("/app/costs");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Costs</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>costs/{urlParams.singleCostsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Date</label><p className="m-0 ml-3" >{_entity?.date}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Linked Account Id</label><p className="m-0 ml-3" >{_entity?.linkedAccountId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Linked Account Name</label><p className="m-0 ml-3" >{_entity?.linkedAccountName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Service</label><p className="m-0 ml-3" >{_entity?.service}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Usage Type</label><p className="m-0 ml-3" >{_entity?.usageType}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Item Description</label><p className="m-0 ml-3" >{_entity?.itemDescription}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Resource Name</label><p className="m-0 ml-3" >{_entity?.resourceName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Resource ID</label><p className="m-0 ml-3" >{_entity?.resourceId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Availability Zone</label><p className="m-0 ml-3" >{_entity?.availabilityZone}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Unit Price</label><p className="m-0 ml-3" >{_entity?.unitPrice}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Usage Quantity</label><p className="m-0 ml-3" >{_entity?.usageQuantity}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Amount</label><p className="m-0 ml-3" >{_entity?.amount}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Previous Month Amount</label><p className="m-0 ml-3" >{_entity?.previousMonthAmount}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Monthly Growth</label><p className="m-0 ml-3" >{_entity?.monthlyGrowth}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tag Department</label><p className="m-0 ml-3" >{_entity?.tagDepartment}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tag Application</label><p className="m-0 ml-3" >{_entity?.tagApplication}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tag Environment</label><p className="m-0 ml-3" >{_entity?.tagEnvironment}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tag Owner</label><p className="m-0 ml-3" >{_entity?.tagOwner}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tag Project</label><p className="m-0 ml-3" >{_entity?.tagProject}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singleCostsId}
        user={props.user}
        alert={props.alert}
        serviceName="costs"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleCostsPage);
