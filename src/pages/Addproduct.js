import { Form, Input, Select } from "antd";
import { React, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import {
  createProducts,
  getAProduct,
  resetState,
  updateProduct,
} from "../features/product/productSlice";
import {
  clearAllImages,
  delImg,
  uploadImg,
} from "../features/upload/uploadSlice";

const Addproduct = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const imgState = useSelector((state) => state.upload.images);

  const [images, setImages] = useState([]);

  const productId = location.pathname.split("/")[3];

  const getProductById = async (id) => {
    const res = await dispatch(getAProduct(id));
    if (res) {
      form.setFieldsValue(res.payload);
      setImages(res.payload.images);
    }
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
  }, [productId]);

  useEffect(() => {
    setImages(imgState);
  }, [JSON.stringify(imgState)]);

  return (
    <div>
      <h3 className="mb-4 title">{productId ? "Edit" : "Add"} Product</h3>
      <div>
        <Form
          initialValues={{
            title: undefined,
            description: undefined,
            price: undefined,
            brand: undefined,
            category: undefined,
            tags: undefined,
            quantity: undefined,
            images: undefined,
          }}
          form={form}
          onFinish={async (values) => {
            const res = productId
              ? await dispatch(
                  updateProduct({ id: productId, ...values, images: images })
                )
              : await dispatch(createProducts({ ...values, images: images }));

            if (res.payload?._id) {
              toast.success(
                productId
                  ? "Product Updated Successfullly!"
                  : "Product Created Successfullly!"
              );
              form.resetFields();
              form.setFieldsValue({});
              setImages([]);
              dispatch(clearAllImages());

              dispatch(resetState());

              setTimeout(() => {
                navigate("/admin/list-product");
              }, 1000);
            }
          }}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input size="large" type="text" placeholder="Enter Product Title" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Required" }]}
          >
            <ReactQuill theme="snow" placeholder="Enter Product Description" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              size="large"
              type="number"
              placeholder="Enter Product Price"
              min={0}
            />
          </Form.Item>
          <Form.Item
            name="brand"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select
              size="large"
              className="form-control py-3 mb-3"
              placeholder="Select Brand"
            >
              {brandState.map((i, j) => {
                return (
                  <Select.Option key={j} value={i.title}>
                    {i.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="category"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select
              size="large"
              className="form-control py-3 mb-3"
              id=""
              placeholder="Select Category"
            >
              {catState.map((i, j) => {
                return (
                  <Select.Option key={j} value={i.title}>
                    {i.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="tags"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select
              size="large"
              className="form-control py-3 mb-3"
              id=""
              placeholder="Select Tags"
            >
              <Select.Option value="featured">Featured</Select.Option>
              <Select.Option value="popular">Popular</Select.Option>
              <Select.Option value="special">Special</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              size="large"
              type="number"
              min={0}
              placeholder="Enter Product Quantity"
            />
          </Form.Item>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="  showimages d-flex flex-wrap gap-3">
            {images?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(delImg(i.public_id));
                      setImages(
                        images.filter((k) => k.public_id !== i.public_id)
                      );
                    }}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {productId ? "Update Product" : "Add Product"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Addproduct;
