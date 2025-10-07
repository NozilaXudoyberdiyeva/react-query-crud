import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import instance from "../axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    let nav = useNavigate()

    async function handleCreate(product){
      await  instance.post("/products", product)
    }

    const mutation = useMutation({
        mutationFn: handleCreate,
        onSuccess: () => {
            toast.default("Product created!")
            nav("/")
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    };

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
            {...register("price")}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Create
        </Button>
      </form>
    </Card>
  );
};

export default Create;
