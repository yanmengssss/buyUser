import {
  Button,
  Select,
  Input,
  Drawer,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getUserList, setUser, banUser, cancelBan } from "@/apis/api";

interface DataType {
  id: string;
  nickname: string;
  account: string;
  permission: "user" | "manger";
  status: "normal" | "ban";
}

const colorMap = {
  user: { label: "用户", color: "green" },
  manger: { label: "管理员", color: "blue" },
  normal: { label: "正常", color: "#2db7f5" },
  ban: { label: "禁用", color: "#BEBEBE" },
};

type chooseTypeType = "" | "ID" | "nickname" | "permission" | "status";

const PersonManger: React.FC = () => {
  const [ChooseType, setChooseType] = useState<chooseTypeType>("");
  const [drawerType, setDrawerType] = useState<boolean>(false);
  const [data, setData] = useState<DataType[]>([]); // 存储数据
  const [total, setTotal] = useState<number>(0); // 数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
  const [pageSize] = useState<number>(6); // 每页显示的数据条数
  const [drawState, setDrawState] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [edit, setedit] = useState<boolean>(false);
  const changeType = async (params) => {
    const res = await setUser(params);
    if (res.code == "0") {
      messageApi.open({
        type: "success",
        content: "修改成功",
      });
      const temp = drawState;
      temp.permission = params.right == 0 ? "user" : "manger";
      setDrawState(temp);
      getTotal();
    } else {
      messageApi.open({
        type: "error",
        content: "修改失败",
      });
    }
  };
  const changeStatus = async (params) => {
    let res = null;
    if (params.ban == 0) {
      res = await cancelBan({ userId: params.userId });
    } else {
      res = await banUser({ userId: params.userId });
    }

    if (res.code == "0") {
      messageApi.open({
        type: "success",
        content: "修改成功",
      });
      const temp = drawState;
      console.log(temp);
      temp.status = params.status == 0 ? "normal" : "ban";
      console.log(temp);
      setDrawState(temp);
      getTotal();
    } else {
      messageApi.open({
        type: "error",
        content: "修改失败",
      });
    }
  };
  const handleReset = () => {
    setChooseType("");
    fetchData(1);
    setSearchValue("");
    setCurrentPage(1);
  };
  // 处理选择类型
  const handleChange = (value: chooseTypeType) => {
    console.log(`selected ${value}`);
    setChooseType(value);
  };
  const [totalData, setTotalData] = useState([]);
  const [SearchValue, setSearchValue] = useState("");
  // 分页加载数据
  const fetchData = async (page: number) => {
    const res = await getUserList(pageSize, page); // 获取用户数据，传入页码和每页条数
    setTotal(res.data.total); // 设置数据总数
    const data = [];
    res.data.items.forEach((item) => {
      data.push({
        id: item.userId,
        nickname: item.name,
        account: item.account,
        permission: item.right == 0 ? "user" : "manger",
        status: item.ban == 0 ? "normal" : "ban",
      });
    });
    setData(data); // 更新当前页的数据
  };
  const getTotal = async () => {
    const res = await getUserList(100, 1); // 获取用户数据，传入页码和每页条数
    setTotal(res.data.total); // 设置数据总数
    const data = [];
    res.data.items.forEach((item) => {
      data.push({
        id: item.userId,
        nickname: item.name,
        account: item.account,
        permission: item.right == 0 ? "user" : "manger",
        status: item.ban == 0 ? "normal" : "ban",
      });
    });
    setTotalData(data); // 更新当前页的数据
  };
  const handleSearch = () => {
    console.log(ChooseType, SearchValue);
    if (ChooseType == "ID") {
      const data = totalData.filter((item) => item.id == SearchValue);
      setData(data);
      setTotal(data.length);
    } else if (ChooseType == "nickname") {
      const data = totalData.filter((item) => item.nickname == SearchValue);
      setData(data);
      setTotal(data.length);
    } else if (ChooseType == "permission") {
      const data = totalData.filter((item) => item.permission == SearchValue);
      setData(data);
      setTotal(data.length);
    } else if (ChooseType == "status") {
      const data = totalData.filter((item) => item.status == SearchValue);
      setData(data);
      setTotal(data.length);
    }
  };
  // 初始化加载数据
  useEffect(() => {
    fetchData(currentPage); // 第一次加载数据
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
      title: "昵称",
      dataIndex: "nickname",
      align: "center",
      key: "nickname",
    },
    {
      title: "账号",
      dataIndex: "account",
      align: "center",
      key: "account",
    },
    {
      title: "权限",
      dataIndex: "permission",
      align: "center",
      key: "permission",
      render: (text: string, record: DataType) => (
        <Tag color={colorMap[record.permission].color}>
          {colorMap[record.permission].label}
        </Tag>
      ),
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
              setDrawerType(true);
              setDrawState(record);
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
          options={[
            { value: "ID", label: "ID" },
            { value: "nickname", label: "昵称" },
            { value: "permission", label: "权限" },
            { value: "status", label: "状态" },
          ]}
        />
        {ChooseType === "permission" && (
          <Select
            defaultValue="user"
            onChange={(e) => {
              setSearchValue(e);
            }}
            style={{ width: 300, marginLeft: 50 }}
            options={[
              { value: "manger", label: "管理员" },
              { value: "user", label: "用户" },
            ]}
          />
        )}
        {ChooseType === "status" && (
          <Select
            defaultValue=""
            style={{ width: 300, marginLeft: 50 }}
            onChange={(e) => {
              setSearchValue(e);
            }}
            options={[
              { value: "normal", label: "正常" },
              { value: "ban", label: "禁用" },
            ]}
          />
        )}
        {ChooseType !== "status" && ChooseType !== "permission" && (
          <Input
            placeholder="请输入信息"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 300, marginLeft: 50 }}
          />
        )}
        <Button
          type="primary"
          style={{ marginLeft: 50 }}
          onClick={handleSearch}
        >
          搜索
        </Button>{" "}
        <Button type="primary" style={{ marginLeft: 50 }} onClick={handleReset}>
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
        onClose={() => setDrawerType(false)}
        open={drawerType}
      >
        <div>
          <h5>ID</h5>
          <p>{drawState.id}</p>
        </div>
        <div>
          <h5>昵称</h5>
          <p>{drawState.nickname}</p>
        </div>
        <div>
          <h5>账号</h5>
          <p>{drawState.account}</p>
        </div>
        <div>
          <h5>权限</h5>
          {!edit && (
            <p>
              <Tag
                color={
                  colorMap[drawState.permission ? drawState.permission : "user"]
                    .color
                }
              >
                {
                  colorMap[drawState.permission ? drawState.permission : "user"]
                    .label
                }
              </Tag>
            </p>
          )}
          {edit && (
            <Select
              defaultValue={
                drawState.permission ? drawState.permission : "user"
              }
              onChange={(e) => {
                changeType({
                  userId: drawState.id,
                  right: e === "user" ? 0 : 1,
                });
              }}
              style={{ width: 300, marginLeft: 50 }}
              options={[
                { value: "manger", label: "管理员" },
                { value: "user", label: "用户" },
              ]}
            />
          )}
        </div>
        <div>
          <h5>状态</h5>
          {!edit && (
            <p>
              <Tag
                color={
                  colorMap[drawState.status ? drawState.status : "ban"].color
                }
              >
                {colorMap[drawState.status ? drawState.status : "ban"].label}
              </Tag>
            </p>
          )}
          {edit && (
            <Select
              defaultValue={drawState.status ? drawState.status : "ban"}
              style={{ width: 300, marginLeft: 50 }}
              onChange={(e) => {
                changeStatus({
                  userId: drawState.id,
                  ban: e === "normal" ? 0 : 1,
                });
              }}
              options={[
                { value: "normal", label: "正常" },
                { value: "ban", label: "禁用" },
              ]}
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
            <Button type="primary">关闭</Button>
            {!edit && (
              <Button type="primary" onClick={() => setedit(true)}>
                编辑
              </Button>
            )}
            {edit && (
              <Button type="primary" onClick={() => setedit(false)}>
                确定
              </Button>
            )}
          </Space>
        </div>
      </Drawer>
    </div>
  );
};

export default PersonManger;
