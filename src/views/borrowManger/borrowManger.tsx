import {
  Button,
  Select,
  Input,
  Drawer,
  Space,
  Table,
  Tag,
  Pagination,
} from "antd";
import { useState, useEffect } from "react";
import { borrowHistory } from "../../apis/api"; // 假设你有一个借阅记录的API接口
import dayjs from "dayjs";
interface DataType {
  id: string;
  bookname: string;
  borrowTime: string;
  user: string;
  status: 0 | 1 | 2;
  trueBackTime: string;
  predictedBackTime: string;
}

type chooseType = "" | "id" | "name" | "user" | "status";

const chooseData = [
  { value: "id", label: "ID" },
  { value: "name", label: "书名" },
  { value: "user", label: "用户" },
  { value: "status", label: "状态" },
];

const chooseStatus = [
  {
    value: "0",
    label: "已归还",
  },
  {
    value: "1",
    label: "未归还",
  },
  {
    value: "2",
    label: "已超时",
  },
];

const colorMap = {
  0: { label: "已归还", color: "green" },
  1: { label: "未归还", color: "blue" },
  2: { label: "已超时", color: "red" },
};

const BookManger: React.FC = () => {
  const [searchData, setSearchData] = useState(""); // 搜索结果
  const [ChooseType, setChooseType] = useState<chooseType>(""); // 用来控制选择框
  const [drawerType, setdrawerType] = useState<boolean>(false); // 控制 Drawer 是否显示
  const [data, setData] = useState<DataType[]>([]); // 数据
  const [total, setTotal] = useState<number>(0); // 总数据条数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [loading, setLoading] = useState<boolean>(false); //  加载状态
  const [totalData, setTotalData] = useState<DataType[]>([]);
  const [drawerState, setDrawerState] = useState({});
  const [edit, setedit] = useState<boolean>(false);
  // 选择框变化时更新 ChooseType
  const handleChange = (value: chooseType) => {
    setChooseType(value); // 更新选择的过滤项
  };
  const handleSearch = () => {
    const data = [];
    totalData.forEach((item) => {
      if (item[ChooseType] === searchData) {
        data.push(item);
      }
    });
    setData(data);
    setTotal(data.length);
  };
  const handleReseat = () => {
    fetchData(1);
    setCurrentPage(1);
    setSearchData("");
  };
  const getTotal = async () => {
    setLoading(true);
    try {
      const response = await borrowHistory(
        100,
        1
        // 每页显示10条
      );
      if (response) {
        response.data.items.forEach((item) => {
          temp.push({
            id: item.rentId,
            bookname: item.bookName,
            bookId: item.bookId,
            borrowTime: dayjs(item.createTime).format("YYYY-MM-DD"),
            user: item.userId,
            status: item.status,
            predictedBackTime: dayjs(item.anticipate).format("YYYY-MM-DD"),
          });
        });
        setTotalData(temp); // 假设 response.data 是分页后的数据
        setTotal(response.total); // 假设 response.total 是总数据量
      }
    } catch (error) {
      console.error("请求数据失败", error);
    } finally {
      setLoading(false);
    }
  };
  // 发起API请求加载数据
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await borrowHistory(
        10,
        page
        // 每页显示10条
      );
      if (response) {
        const temp = [];
        response.data.items.forEach((item) => {
          temp.push({
            id: item.rentId,
            bookname: item.bookName,
            bookId: item.bookId,
            borrowTime: dayjs(item.createTime).format("YYYY-MM-DD"),
            user: item.userId,
            status: item.status,
            predictedBackTime: dayjs(item.anticipate).format("YYYY-MM-DD"),
          });
        });
        setData(temp);
        setTotal(response.total); // 假设 response.total 是总数据量
      }
    } catch (error) {
      console.error("请求数据失败", error);
    } finally {
      setLoading(false);
    }
  };

  // 页码变化时重新加载数据
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  // 初始化时加载第一页数据
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  useEffect(() => {
    getTotal();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      key: "id",
    },
    {
      title: "书名",
      dataIndex: "bookname",
      align: "center",
      key: "bookname",
    },
    {
      title: "书籍ID",
      dataIndex: "bookId",
      align: "center",
      key: "bookId",
    },
    {
      title: "日期",
      dataIndex: "borrowTime",
      align: "center",
      key: "borrowTime",
    },
    {
      title: "用户",
      dataIndex: "user",
      align: "center",
      key: "user",
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
      title: "预计归还日期",
      dataIndex: "predictedBackTime",
      align: "center",
      key: "predictedBackTime",
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
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={handleChange}
          options={chooseData}
        />
        {ChooseType === "status" && (
          <Select
            defaultValue=""
            onChange={(value) => setSearchData(value)}
            style={{ width: 300, marginLeft: 50 }}
            options={chooseStatus}
          />
        )}
        {ChooseType !== "status" && (
          <Input
            placeholder="请输入信息"
            style={{ width: 300, marginLeft: 50 }}
            onChange={(e) => setSearchData(e.target.value)}
          />
        )}
        <Button
          type="primary"
          style={{ marginLeft: 50 }}
          onClick={handleSearch}
        >
          搜索
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 50 }}
          onClick={handleReseat}
        >
          搜索
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: "50px" }}
        pagination={false} // 禁用默认分页
        loading={loading} // 显示加载状态
      />
      <Pagination
        current={currentPage}
        pageSize={10}
        total={total}
        showSizeChanger={false}
        onChange={handlePageChange}
        style={{ marginTop: 20, textAlign: "center" }}
      />
      <Drawer
        title="详情信息"
        placement="right"
        onClose={() => setdrawerType(false)}
        open={drawerType}
      >
        <div>
          <h5>借阅ID</h5>
          <p>{drawerState.id}</p>
        </div>

        <div>
          <h5>用户ID</h5>
          <p>{drawerState.userId}</p>
        </div>
        <div>
          <h5>书籍ID</h5>
          <p>{drawerState.bookId}</p>
        </div>
        <div>
          <h5>书名</h5>
          <p>{drawerState.bookName}</p>
        </div>
        <div>
          <h5>日期</h5>
          <p>{drawerState.borrowTime}</p>
        </div>
        <div>
          <h5>状态</h5>
          {!edit && (
            <Tag color={colorMap[drawerState.status || 0].color}>
              {colorMap[drawerState.status || 0].label}
            </Tag>
          )}
          {edit && (
            <Select
              defaultValue={colorMap[drawerState.status || 0].label}
              onChange={(value) => {
                // changeStatus(value, drawerState.book);
                setDrawerState({ ...drawerState, status: value });
              }}
              options={chooseStatus.splice(-1)}
            />
          )}
        </div>
        <div>
          <h5>预计归还日期</h5>
          <p>{drawerState.predictedBackTime}</p>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
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
            {/* <Button type="primary" onClick={() => setedit(true)}>
              编辑
            </Button>
            <Button type="primary" onClick={() => setedit(false)}>
              保存
            </Button> */}
          </Space>
        </div>
      </Drawer>
    </div>
  );
};
export default BookManger;
