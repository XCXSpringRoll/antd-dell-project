import Mock from "mockjs";
let List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: i,
      title: "@ctitle(5, 10)",
      author: "@cname",
      "sex|1": ["男","女"],
      readings: "@integer(300000, 5000000)",
      phone: "@integer(13523004566, 18923004566)",
      "star|1-3": "★",
      "status|1": ["published", "draft"],
      date: "@date",
    })
  );
}
export default {
  tableList: (config) => {
    const { pageNumber, pageSize, title, status, star } = JSON.parse(
      config.body
    );
    let start = (pageNumber - 1) * pageSize;
    let end = pageNumber * pageSize;
    let mockList = List.filter((item) => {
      if (star && item.star.length !== star) return false;
      if (status && item.status !== status) return false;
      if (title && item.title.indexOf(title) < 0) return false;
      return true;
    });
    let pageList = mockList.slice(start, end);
    return {
      code: 20000,
      data: {
        total: mockList.length,
        items: pageList,
      },
    };
  },
  deleteItem: (config) => {
    const { id } = JSON.parse(config.body);
    const item = List.filter((item) => item.id === id);
    const index = List.indexOf(item[0]);
    List.splice(index, 1);
    return {
      code: 20000,
    };
  },
  editItem: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    const item = List.filter((item) => item.id === id);
    const index = List.indexOf(item[0]);
    List.splice(index, 1, data);
    return {
      code: 20000,
    };
  },
};
