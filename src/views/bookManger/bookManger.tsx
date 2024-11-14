import { Button, Select, Input, Drawer, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getBookList, updataBook } from "../../apis/api";
import dayjs from "dayjs";
// import { booktype } from "../../store/common";
interface DataType {
  id: string;
  name: string;
  ISBN: string;
  place: string;
  public: string;
  type: string;
  hot: number;
  inTime: string;
  status: 0 | 1 | 2;
}
type booktype =
  | "literature_art"
  | "history_geography"
  | "social_sciences"
  | "natural_sciences"
  | "technology_engineering"
  | "life_health"
  | "management_business";

type chooseType =
  | ""
  | "id"
  | "name"
  | "ISBN"
  | "place"
  | "public"
  | "type"
  | "status";
const chooseData = [
  { value: "id", label: "ID" },
  { value: "name", label: "书名" },
  { value: "ISBN", label: "ISBN" },
  { value: "hot", label: "权重" },
  { value: "place", label: "位置" },
  { value: "public", label: "出版社" },
  { value: "type", label: "类型" },
  { value: "status", label: "状态" },
];
const chooseBookType = [
  { value: "literature_art", label: "文学与艺术" },
  { value: "history_geography", label: "历史与地理" },
  { value: "social_sciences", label: "社会科学" },
  { value: "natural_sciences", label: "自然科学" },
  { value: "technology_engineering", label: "技术与工程" },
  { value: "life_health", label: "生活与健康" },
  { value: "management_business", label: "管理与商业" },
];
const chooseStatus = [
  {
    value: "0",
    label: "在馆",
  },
  {
    value: "1",
    label: "已借出",
  },
  {
    value: "2",
    label: "已转出",
  },
];
const bookTypeList = [
  "literature_art",
  "history_geography",
  "social_sciences",
  "natural_sciences",
  "technology_engineering",
  "life_health",
  "management_business",
];
const colorMap = {
  0: { label: "在馆", color: "green" },
  1: { label: "已借出", color: "blue" },
  2: { label: "已转出", color: "red" },
  literature_art: { label: "文学与艺术", color: "green" },
  history_geography: { label: "历史与地理", color: "blue" },
  social_sciences: { label: "社会科学", color: "red" },
  natural_sciences: { label: "自然科学", color: "orange" },
  technology_engineering: { label: "技术与工程", color: "purple" },
  life_health: { label: "生活与健康", color: "cyan" },
  management_business: { label: "管理与商业", color: "magenta" },
};
const BookManger: React.FC = () => {
  const [ChooseType, setChooseType] = useState<chooseType>("");
  const [drawerType, setdrawerType] = useState<boolean>(false);
  const [data, setData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pageSize] = useState<number>(7);
  const [seachVal, setSearchValue] = useState("");
  const [totalBook, setTotalBook] = useState<DataType[]>([]);
  const [edit, setedit] = useState<boolean>(false);
  const [drawerState, setDrawerState] = useState({});
  const handleChange = (value: chooseType) => {
    console.log(`selected ${value}`);
    setChooseType(value);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      key: "id",
    },
    {
      title: "书名",
      dataIndex: "name",
      align: "center",
      key: "name",
    },
    {
      title: "ISBN",
      dataIndex: "ISBN",
      align: "center",
      key: "ISBN",
    },
    {
      title: "出版社",
      dataIndex: "public",
      align: "center",
      key: "public",
    },
    {
      title: "入库时间",
      dataIndex: "inTime",
      align: "center",
      key: "inTime",
    },
    {
      title: "位置",
      dataIndex: "place",
      align: "center",
      key: "place",
    },
    {
      title: "类型",
      dataIndex: "type",
      align: "center",
      key: "type",
      render: (text: string, record: DataType) => (
        <Tag color={colorMap[record.type as booktype].color}>
          {colorMap[record.type as booktype].label}
        </Tag>
      ),
    },
    {
      title: "权重",
      dataIndex: "hot",
      align: "center",
      key: "hot",
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (text, record: DataType) => (
        <Tag color={colorMap[record.status].color}>
          {colorMap[record.status].label}
        </Tag>
      ),
    },
    {
      title: "操作",
      dataIndex: "operate",
      align: "center",
      key: "operate",
      render: (text, record: DataType) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setdrawerType(true);
              setDrawerState(record);
            }}
          >
            编辑
          </Button>
        </Space>
      ), // 示例显示 account 值
    },
  ];
  const reset = () => {
    setSearchValue("");
    fetchData(1);
    setCurrentPage(1);
  };
  const changeData = () => {
    const data = {
      book: {
        bookName: drawerState.name,
        isbn: drawerState.ISBN,
        publish: drawerState.public,
        loaction: drawerState.place,
        type: bookTypeList.findIndex((it) => it == drawerState.type)
          ? bookTypeList.findIndex((it) => it == drawerState.type)
          : bookTypeList[0],
        hot: drawerState.hot,
        status: drawerState.status,
      },
      bookId: drawerState.id,
    };
    updataBook(data).then((res) => {
      if (res.code == "0") {
        fetchData(currentPage);
        setedit(false);
      }
    });
  };
  const getTotal = async () => {
    const res = await getBookList(100, 1); // 获取用户数据，传入页码和每页条数
    setTotal(res.data.total); // 设置数据总数
    const data = [];
    res.data.items.forEach((item) => {
      data.push({
        id: item.bookId,
        name: item.bookName,
        ISBN: item.isbn,
        public: item.publish,
        inTime: dayjs(item.createTime).format("YYYY-MM-DD"),
        place: item.loaction,
        type: bookTypeList[item.type]
          ? bookTypeList[item.type]
          : bookTypeList[0],
        hot: item.hot,
        status: item.status,
      });
    });
    console.log(data);
    setTotalBook(data); // 更新当前页的数据
  };
  const searchData = () => {
    const res = [];
    totalBook.forEach((item) => {
      if (item[ChooseType] == seachVal) {
        res.push(item);
      }
    });
    setData(res);
    setTotal(res.length);
  };
  const fetchData = async (page: number) => {
    const res = await getBookList(pageSize, page); // 获取用户数据，传入页码和每页条数
    setTotal(res.data.total); // 设置数据总数
    const data = [];
    res.data.items.forEach((item) => {
      data.push({
        id: item.bookId,
        name: item.bookName,
        ISBN: item.isbn,
        public: item.publish,
        inTime: dayjs(item.createTime).format("YYYY-MM-DD"),
        place: item.loaction,

        type: bookTypeList[item.type]
          ? bookTypeList[item.type]
          : bookTypeList[0],
        hot: item.hot,
        status: item.status,
      });
    });
    console.log(data, 123);
    setData(data); // 更新当前页的数据
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  useEffect(() => {
    getTotal();
  }, []);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={handleChange}
          options={chooseData}
        />
        {ChooseType === "type" && (
          <Select
            defaultValue=""
            onChange={(value) => setSearchValue(value)}
            style={{ width: 300, marginLeft: 50 }}
            options={chooseBookType}
          />
        )}
        {ChooseType === "status" && (
          <Select
            defaultValue=""
            onChange={(value) => setSearchValue(value)}
            style={{ width: 300, marginLeft: 50 }}
            options={chooseStatus}
          />
        )}
        {ChooseType !== "status" && ChooseType !== "type" && (
          <Input
            placeholder="请输入信息"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 300, marginLeft: 50 }}
          />
        )}

        <Button type="primary" style={{ marginLeft: 50 }} onClick={searchData}>
          搜索
        </Button>
        <Button type="primary" style={{ marginLeft: 50 }} onClick={reset}>
          重置
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: "50px" }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page) => setCurrentPage(page), // 更新当前页码
          showSizeChanger: false, // 禁用更改每页条数
          showQuickJumper: false, // 禁用快速跳转
        }}
      />
      <Drawer
        title="详情信息"
        placement="right"
        onClose={() => setdrawerType(false)}
        open={drawerType}
      >
        <div>
          <h5>ID</h5>
          <p>{drawerState.id}</p>
        </div>
        <div>
          <h5>昵称</h5>
          {!edit && <p>{drawerState.name}</p>}
          {edit && (
            <Input
              value={drawerState.name}
              onChange={(e) =>
                setDrawerState({ ...drawerState, name: e.target.value })
              }
            />
          )}
        </div>
        <div>
          <h5>ISBN</h5>
          <p>{drawerState.ISBN}</p>
        </div>
        <div>
          <h5>出版社</h5>
          <p>{drawerState.publiC}</p>
        </div>
        <div>
          <h5>权重</h5>
          {!edit && <p>{drawerState.hot}</p>}
          {edit && (
            <Input
              value={drawerState.hot}
              onChange={(e) =>
                setDrawerState({ ...drawerState, hot: e.target.value })
              }
            />
          )}
        </div>
        <div>
          <h5>入库时间</h5>
          <p>{drawerState.inTime}</p>
        </div>
        <div>
          <h5>位置</h5>
          {!edit && <p>{drawerState.place}</p>}
          {edit && (
            <Input
              value={drawerState.place}
              onChange={(e) =>
                setDrawerState({ ...drawerState, place: e.target.value })
              }
            />
          )}
        </div>
        <div>
          <h5>类型</h5>
          {!edit && (
            <Tag
              color={
                colorMap[drawerState.type ? drawerState.type : "life_health"]
                  .color
              }
            >
              {
                colorMap[drawerState.type ? drawerState.type : "life_health"]
                  .label
              }
            </Tag>
          )}

          {edit && (
            <Select
              defaultValue={
                colorMap[drawerState.type ? drawerState.type : "life_health"]
                  .label
              }
              onChange={(value) =>
                setDrawerState({
                  ...drawerState,
                  type: value,
                })
              }
              style={{ width: 300, marginLeft: 50 }}
              options={chooseBookType}
            />
          )}
        </div>
        <div>
          <h5>状态</h5>
          {!edit && (
            <Tag
              color={
                colorMap[drawerState.status ? drawerState.status : 0].color
              }
            >
              {colorMap[drawerState.status ? drawerState.status : 0].label}
            </Tag>
          )}
          {edit && (
            <Select
              defaultValue={
                colorMap[drawerState.status ? drawerState.status : 0].label
              }
              onChange={(value) =>
                setDrawerState({ ...drawerState, status: value })
              }
              style={{ width: 300, marginLeft: 50 }}
              options={chooseStatus}
            />
          )}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setdrawerType(false);
                setedit(false);
              }}
            >
              关闭
            </Button>
            {!edit && (
              <Button
                type="primary"
                onClick={() => {
                  setedit(true);
                  console.log(drawerState);
                }}
              >
                编辑
              </Button>
            )}
            {edit && (
              <Button type="primary" onClick={changeData}>
                提交
              </Button>
            )}
          </Space>
        </div>
      </Drawer>
    </div>
  );
};
export default BookManger;
