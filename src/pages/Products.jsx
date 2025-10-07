import React from 'react'
import instance from '../axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// crud - post, get, put, delete

const Products = () => {
  const queryClient = useQueryClient()

  async function handleGet (){
    const response = await instance.get("/products")    
    return response.data
  }

  async function handleDelete(id) {
    await instance.delete(`/products/${id}`)
  }

  const {isLoading, error, data} = useQuery({
    queryKey: ["getProducts"],
    queryFn: handleGet
  })

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      toast.error("Product deleted!");
      queryClient.invalidateQueries((["getProducts"]))
    }
  })

  if(isLoading) return <h1>Loading...</h1>
  if (error) return <h1>{error.message}</h1>
    
  return (
    <div className="grid grid-cols-4 gap-5 px-6 py-10">
      {data.map((product) => (
        <Card key={product.id} className="w-80">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={product.img}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {product.title}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {product.price} so'm
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              {product.desc}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex gap-4">
            <Link to={`/update/${product.id}`}>
              <Button
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => {
                mutation.mutate(product.id);
                
              }}
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Products
