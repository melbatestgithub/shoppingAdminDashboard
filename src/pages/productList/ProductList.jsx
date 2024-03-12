import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchProductFailure,
  fetchProductStart,
  fetchProductSuccess,
  deleteProducts
} from "../../redux/productSlice";
import { userRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);
  const getProduct = async (dispatch) => {
    try {
      dispatch(fetchProductStart());
      const res = await userRequest.get("/products");
      dispatch(fetchProductSuccess(res.data));
      console.log(res.data);
    } catch (error) {
      console.log("unable to fetch product data");
      dispatch(fetchProductFailure());
    }
  };

  const DeleteProduct=async(id,dispatch)=>{
    try {
      await userRequest.delete(`/products/${id}`)
      dispatch(deleteProducts(id))
      
    } catch (error) {
      console.log("unable to delete a product")
    }

  }

  const handleDelete = (id) => {
   DeleteProduct(id,dispatch)
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 150 },

    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}
