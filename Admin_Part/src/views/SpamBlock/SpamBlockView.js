import React, { Component } from "react";

import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";
import Tabimg from '../../assets/images/tabimg1.png';
import viewpost from '../../assets/images/viewpost.png';
import "../../assets/Css/Style.css"
class SpamBlockView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const path = [
      {
        title: "spam/block",
        url: "/Spam-Block"
      },
      {
        title: "view",
        url: "/SpamBlockView"
      }
    ];
    return (
      <div className="main-content-container p-4 container-fluid">
      <div className='AllUsersView_sect'>
      <div className="head_top">
        <Breadcrumb title={"Form"} path={path} />
         </div>
     <div className='card_body'>
       <div className='allpost_sect'>
       <div className='user_avtar'>
         <div className='userimg'>
         <img src={Tabimg} />
         </div>
         <div className='user_dt'>
           <h3>Annie Cooper</h3>
           <p>Post Id- <span>31411</span></p>
           <p>Oct,12th 2023</p>
           <div className='allpost_inner'>
         <div className='lft_bx'>
           <h3>I need help with my layout!</h3>
           <h4>Hi everyone!</h4>
           <p>I want to make my modular home. This is the floor plan so far. I'm wondering about the arrangement of the living, dining, and kitchen areas. Presently, the kitchen is on the south facing wall and wondering if it would be better to place the dining room where the kitchen is located in the plan so we receive more light. The kitchen would have windows facing south but it won't be as much as if we had floor to ceiling windows or sliding doors. I'm concerned it would look odd to have the kitchen in the middle of the room. Any suggestions?</p>

         </div>
         <div className='rgt_bx'>
         <img src={viewpost} />
         </div>

       </div>
         </div>
       </div>
      
       </div>
      

     </div>
     <div className='card_body'>
       <div className='allpost_sect'>
       <div className='user_avtar'>
         <div className='userimg'>
         <img src={Tabimg} />
         </div>
         <div className='user_dt'>
           <h3>Patricia Colwell</h3>
           <p>Oct,12th 2023</p>
           <div className='allpost_det'>
           <p>I'm not satisfied with the current plan, as it's excessively long and results in certain areas being too dim. It's frustrating that it lacks natural light. Moreover, the access to the backyard is far from ideal, which is quite disappointing.</p>
           <h5>Reason</h5>
        </div>
         </div>
       </div>
      
       </div>
      

      
     </div>
     <div className='btn_grp mt-5'>
          <button className='btn'>Reject</button>
          <button className='btn'>approve</button>
        </div>
   </div>
   </div>
    );
  }
}
export default SpamBlockView;
