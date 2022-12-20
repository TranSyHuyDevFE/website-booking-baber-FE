export const adminMenu = [
  //quản lí người dùng
  {
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
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
  //quản lí dịch vụ
  {
    name: "menu.admin.service",
    menus: [
      {
        name: "menu.admin.manage-service",
        link: "/system/manage-service",
      },
    ],
  },
  {
    //chuyển sang trạng thái tắt
    name: "menu.admin.other",
    menus: [
      {
        name: "menu.barber.sleeping",
        link: "/system/home-manage",
      },
    ],
  },
];
export const barberMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quản lí khách hàng đặt lịch của mình
        name: "menu.barber.manage-customer",
        link: "/barber/manage-customer",
      },
      {
        //quản lí lịch sử khách hàng
        name: "menu.barber.manage-customer-history",
        link: "/barber/manage-customer-history",
      },
    ],
  },
  {
    //chuyển sang trạng thái tắt
    name: "menu.admin.other",
    menus: [
      {
        name: "menu.barber.sleeping",
        link: "/system/home-manage",
      },
    ],
  },
];
