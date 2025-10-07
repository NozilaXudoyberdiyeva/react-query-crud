import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import instance from "../axios";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    let nav = useNavigate()

    let {id} = useParams()
    async function handleGetId() {
        const res = await instance.get(`/products/${id}`)
        return res.data
    }

    async function handleUpdate(product){
      await  instance.put(`/products/${id}`, product)
    }

    const mutation = useMutation({
        mutationFn: handleUpdate,
        onSuccess: () => {
            alert("Product updated")
            nav("/")
        }
    })

    const {isLoading, error, data} = useQuery({
        queryKey: ["getProductId"],
        queryFn: handleGetId
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    };

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>{error.message}</h1>

  return (
    <Card color="transparent" className="w-1/4 mx-auto py-5" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Create product
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Title
          </Typography>
          <Input
            defaultValue={data.title}
            {...register("title")}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            desc
          </Typography>
          <Input
            defaultValue={data.desc}
            {...register("desc")}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            img
          </Typography>
          <Input
            defaultValue={data.img}
            {...register("img")}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            price
          </Typography>
          <Input
            defaultValue={data.price}
            {...register("price")}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Update
        </Button>
      </form>
    </Card>
  );
};

export default Update;
