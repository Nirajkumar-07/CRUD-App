import React, { useActionState, useEffect, useState } from "react";
import {
  createStateProduct,
  deleteStateProduct,
  selectList,
  updateStateProduct,
} from "../feature/product/product";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
import placeholderImage from "../assets/images/product-placeholder.jpg";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../actions/product.action";

function CreateProductForm() {
  const dispatch = useDispatch();
  const [state, formAction] = useActionState(createProduct, undefined);

  useEffect(() => {
    if (state && state.success) {
      console.log("state data =>", state.data);
      dispatch(createStateProduct(state.data));
    }
  }, [state]);
  return (
    <div className="w-full">
      <form action={formAction}>
        <div className="md:col-span-2 grid gap-4 content-start grid-cols-2">
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="name" className="flex gap-[2px]">
              Product Name
              <sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter Product Name"
              // className="form-control"
              required
            />
          </div>
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="category" className="flex gap-[2px]">
              Category
              <sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="category"
              name="category"
              type="text"
              placeholder="Enter Category"
              // className="form-control"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="rating" className="flex gap-[2px]">
              Rating
            </Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              max="10"
              placeholder="Enter Rating"
              onInput={(event) => {
                if (event.target.value > 10) event.target.value = 10;
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="amount" className="flex gap-[2px]">
              Amount
              <sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="amount"
              name="amount"
              type="text"
              placeholder="Enter Amount"
              onInput={(event) => {
                event.target.value = event.target.value.replace(/[^0-9.]/g, "");
              }}
              required
            />
          </div>
          <Button className={"bg-green-500 text-white col-span-2"}>Save</Button>
        </div>
      </form>
    </div>
  );
}

function UpdateProductForm({ productId }) {
  const dispatch = useDispatch();
  const productList = useSelector(selectList);
  const product = productList.find((product) => product.id == productId);
  const [state, formAction] = useActionState(updateProduct, undefined);

  useEffect(() => {
    if (state && state.success) dispatch(updateStateProduct(state.data));
  }, [state]);
  return (
    <div className="w-full">
      <form action={formAction}>
        <Input
          id="productId"
          name="productId"
          type="text"
          defaultValue={product.id}
          className="hidden"
          hidden
        />
        <div className="md:col-span-2 grid gap-4 content-start grid-cols-2">
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="name" className="flex gap-[2px]">
              Product Name
              <sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={product.title}
              placeholder="Enter Product Name"
              // className="form-control"
              required
            />
          </div>
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="category" className="flex gap-[2px]">
              Category
              <sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="category"
              name="category"
              type="text"
              defaultValue={product.category}
              placeholder="Enter Product Name"
              // className="form-control"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="rating" className="flex gap-[2px]">
              Rating
            </Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              max="10"
              defaultValue={product.rating}
              placeholder="Enter Product Name"
              onInput={(event) => {
                if (event.target.value > 10) event.target.value = 10;
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="amount" className="flex gap-[2px]">
              Amount
              <sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="amount"
              name="amount"
              type="text"
              defaultValue={product.price}
              placeholder="Enter Amount"
              onInput={(event) => {
                event.target.value = event.target.value.replace(/[^0-9.]/g, "");
              }}
              required
            />
          </div>
          <Button className={"bg-green-500 text-white col-span-2"}>Save</Button>
        </div>
      </form>
    </div>
  );
}

function DeleteProduct({ productId }) {
  const dispatch = useDispatch();
  const handleDelete = async (productId) => {
    const res = await deleteProduct(productId);
    if (res.success) dispatch(deleteStateProduct(productId));
  };
  return (
    <div className="grid gap-2">
      Are you want to delete this product?
      <div className="flex justify-end items-center gap-4">
        <Button
          className={"bg-red-500 text-white"}
          onClick={() => handleDelete(productId)}
        >
          Yes
        </Button>
        <Button className={"border"}>No</Button>
      </div>
    </div>
  );
}

function ProductList() {
  const productList = useSelector(selectList);
  const [dialogState, setDialogState] = useState({
    component: null,
    open: false,
    title: null,
  });

  console.log("productList =>", productList);
  return (
    <>
      <div className="w-full flex justify-end lg:pe-4 pe-2">
        <Button
          className="items-center !gap-1 bg-green-500 text-white"
          onClick={() =>
            setDialogState({
              component: <CreateProductForm />,
              open: true,
              title: "Create Product",
            })
          }
        >
          <Plus size={14} />
          Add new product
        </Button>
      </div>
      <ScrollArea
        className={
          "overflow-auto relative [&>[data-radix-scroll-area-viewport]]:!overflow-auto"
        }
      >
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="ps-10">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-2 items-center">
                  <img
                    src={product.thumbnail || placeholderImage}
                    alt={product.title}
                    height={35}
                    width={35}
                  />
                  <span className="max-lg:overflow-hidden max-lg:overflow-ellipsis max-lg:whitespace-nowrap">
                    {product.title}
                  </span>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="text-right">{product.price}</TableCell>
                <TableCell className="flex gap-2 ps-10">
                  <Button
                    className="items-center !gap-1 bg-blue-500 text-white"
                    onClick={() =>
                      setDialogState({
                        component: <UpdateProductForm productId={product.id} />,
                        open: true,
                        title: "Edit Product",
                      })
                    }
                  >
                    <Pencil size={14} />
                    Edit
                  </Button>
                  <Button
                    className="items-center !gap-1 bg-red-500 text-white"
                    onClick={() =>
                      setDialogState({
                        component: <DeleteProduct productId={product.id} />,
                        open: true,
                        title: "Delete Product",
                      })
                    }
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {dialogState.open && (
        <Dialog
          open={dialogState.open}
          onOpenChange={(event) =>
            setDialogState({ component: null, open: event, title: null })
          }
        >
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent className="max-h-[75%] overflow-auto">
            <DialogHeader>
              <DialogTitle>{dialogState.title}</DialogTitle>
              <DialogDescription />
              <>{dialogState.component}</>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default ProductList;
