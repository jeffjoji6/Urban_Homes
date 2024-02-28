import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { BaseLayout, AdminBaseLayout } from "./layouts";
// Route Views
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import AllPost from "./views/Users/AllPostContainer";
import AllUsers from "./views/Users/AllUsersContainer"
import AllComments from "./views/Users/AllCommentsContainer";
import SpamBlock  from "./views/SpamBlock/SpamBlock";
import Notification from "./views/Notifications/Notifications";
import SpamBlockView from "./views/SpamBlock/SpamBlockView";
import AllPostView from "./views/Users/AllPostView";
import AllUsersView from "./views/Users/AllUsersView";
import AllCommentsView from "./views/Users/AllCommentsView";
var routes = [

  {
    path: "/",
    exact: true,
    layout: AdminBaseLayout,
    component: Login,
  },

  {
    path: "/dashboard",
    exact: true,
    layout: BaseLayout,
    component: Dashboard,
  },

  {
    path: "/admin/Users/AllPost",
    layout: BaseLayout,
    component: AllPost,
  },

  {
    path: "/admin/Users/AllUsers",
    layout: BaseLayout,
    component: AllUsers,
  },

  {
    path: "/admin/Users/AllComments",
    layout: BaseLayout,
    component: AllComments,
  },
  {
    path: "/admin/Users/AllPostView",
    layout: BaseLayout,
    component: AllPostView,
  },
  {
    path: "/admin/Users/AllUsersView",
    layout: BaseLayout,
    component: AllUsersView,
  },
  {
    path: "/admin/Users/AllCommentsView",
    layout: BaseLayout,
    component: AllCommentsView,
  },


  {
    path: "/admin/Spam-Block",
    layout: BaseLayout,
    component: SpamBlock,
  },
  {
    path: "/admin/SpamBlockView",
    layout: BaseLayout,
    component: SpamBlockView,
  },
  {
    path: "/admin/Notification",
    layout: BaseLayout,
    component: Notification,
  },


];

export default routes;
