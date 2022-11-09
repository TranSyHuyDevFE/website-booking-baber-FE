export const adminMenu = [
  //quản lí người dùng
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-barber",
        link: "/system/manage-barber",
      },
      //quản lí kế hoạch barber
      {
        name: "menu.barber.manage-schedule",
        link: "/barber/manage-schedule",
      },
    ],
  },
  //quản lí chi nhánh
  {
    name: "menu.admin.branching",
    menus: [
      {
        name: "menu.admin.manage-branching",
        link: "/system/manage-branching",
      },
    ],
  },
  //quản lí chuyên môn
  {
    name: "menu.admin.service",
    menus: [
      {
        name: "menu.admin.manage-service",
        link: "/system/manage-service",
      },
    ],
  },
  // //quản lí bài đăng
  // {
  //   name: "menu.admin.handbook",
  //   menus: [
  //     {
  //       name: "menu.admin.manage-handbook",
  //       link: "/system/manage-handbook",
  //     },
  //   ],
  // },
];
export const barberMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quản lí kế hoạch barber
        name: "menu.barber.manage-schedule",
        link: "/barber/manage-schedule",
      },
    ],
  },
];
