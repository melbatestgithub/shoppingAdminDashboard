import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { fetchUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function UserList() {
  // const [data, setData] = useState(userRows);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };

  const getUsers = async (dispatch) => {
    try {
      const res = await userRequest.get("/users");
      dispatch(fetchUser(res.data));
    } catch (error) {
      console.log("error while fetching users ");
    }
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={ 
                params.row.img ||
                "https://i.pinimg.com/564x/e0/6a/57/e06a5707a7e215ff44a7b928d87d42e1.jpg"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}
